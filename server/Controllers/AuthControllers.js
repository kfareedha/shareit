import UserModel from "../Models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;

const userEmail = process.env.EMAIL_ID;
const userPassword = process.env.EMAIL_PASSWORD;
import twilio from "twilio";
import nodemailer from "nodemailer";
import otpGenerator from "otp-generator";
const client = twilio(accountSid, authToken);
import OTPModel from "../Models/otpModel.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: userEmail,
    pass: userPassword,
  },
});
transporter.verify((err, success) => {
  if (err) console.log(err);
  else {
    console.log("nodemailer ready for messages");
    console.log(success);
  }
});

const sendEmailOTP = async (email) => {
  try {
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
    });

    const mailOptions = {
      from: userEmail,
      to: email,
      subject: "shareit",
      html: `<p>Your shareit OTP is : ${otp}.</p><p>This will <b>expire in 3 minutes</b>.</p>`,
    };
    const salt = await bcrypt.genSalt(10);
    const hashedOtp = await bcrypt.hash(otp, salt);

    const newOtp = new OTPModel({
      user: email,
      otp: hashedOtp,
      createdAt: Date.now(),
      expiresAt: Date.now() + 1000 * 60 * 3,
    });
    console.log(newOtp, "DDDDDD");
    await newOtp.save();

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
    res.json({ status: false });
  }
};

// Register new user
export const registerUser = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(req.body.password, salt);
  req.body.password = hashedPass;
  const newUser = new UserModel(req.body);

  const { email } = req.body;

  try {
    // addition new
    const oldUser = await UserModel.findOne({ email });

    if (oldUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // changed
    const user = await newUser.save();

    res.status(200).json({
      user,
      status: true,
    });
  } catch (error) {
    // console.log(error);
    res.status(500).json({ message: error.message });
  }
};

//LoginUser
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email: email });

    if (user) {
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        res.status(400).json("WrongPassword");
      } else {
        if (user.activeStatus) {
          if (user.verified.email || user.verified.mobile) {
            const token = jwt.sign(
              { email: user.email, id: user._id },
              process.env.JWT_KEY,
              { expiresIn: "1h" }
            );

            res.status(200).json({
              user,
              status: true,
              token,
            });
          } else {
            res.json({
              user,
              status: true,
            });
          }
        } else {
          res.json({ status: false, message: "Your account is blocked" });
        }
      }
    } else {
      res.status(404).json("User doesnot exist");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//send otp mobile
export const sendOTP = async (req, res, next) => {
  try {
    const item = req.body.data;

    const stringItem = item.toString();

    if (stringItem.match(/^[0-9+]{10,13}$/)) {
      const otp = await sendmobileOTP(item);

      res.json({ status: true });
    } else {
      await sendEmailOTP(item);
      res.json({ status: true });
    }
  } catch (err) {
    next(err);
  }
};

//verify otp
export const verifyOTP = async (req, res, next) => {
  try {
    const { OTP, type } = req.body.data;

    const stringData = type.toString();
    if (stringData.match(/^[0-9+]{10,13}$/)) {
      const verification = await verifymobileOTP(OTP, type);

      if (verification.status === "approved") {
        const user = await UserModel.findOneAndUpdate(
          { mobile: type },
          { $set: { "verified.mobile": true } }
        );

        const token = jwt.sign(
          { email: user.email, id: user._id },
          process.env.JWT_KEY,
          { expiresIn: "1h" }
        );

        res.json({
          status: true,
          token,
          user,
        });
      } else {
        res.json({ status: false, message: "verification failed" });
      }
    } else {
      OTPModel.find({ user: type })
        .then(async (result) => {
          if (result.length > 0) {
            const { expiresAt } = result[result.length - 1];

            const sentOtp = result[result.length - 1].otp;
            if (expiresAt < Date.now()) {
              OTPModel.findOneAndDelete({ user: type })
                .then(() => {
                  res.json({ status: false, message: "OTP Expired" });
                })
                .catch((error) => {});
            } else {
              const same = await bcrypt.compare(OTP, sentOtp);
              if (same) {
                UserModel.updateOne(
                  { email: type },
                  { $set: { "verified.email": true } }
                )
                  .then((user) => {
                    const token = jwt.sign(
                      { email: user.email, id: user._id },
                      process.env.JWT_KEY,
                      { expiresIn: "1h" }
                    );

                    OTPModel.deleteMany({ user: type })
                      .then(() => {
                        UserModel.findOne({ email: type }).then((user) => {
                          res.json({
                            user,
                            token,
                          });
                        });
                      })
                      .catch((error) => {});
                  })
                  .catch((error) => {});
              } else {
                res.json({ status: false, message: "Invalid OTP" });
              }
            }
          } else {
            res.json({ status: false, message: "No user found" });
          }
        })
        .catch((error) => {});
    }
  } catch (error) {
    next(error);

    res.json({ status: false });
  }
};

const sendmobileOTP = (mobile) => {
  return client.verify.v2
    .services(process.env.SERVICE_ID)
    .verifications.create({ to: "+91" + mobile, channel: "sms" });
};

const verifymobileOTP = (otp, mobile) => {
  return client.verify.v2
    .services(process.env.SERVICE_ID)
    .verificationChecks.create({ to: "+91" + mobile, code: otp });
};
