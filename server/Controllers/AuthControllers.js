import UserModel from "../Models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
// const serviceSID = process.env.SERVICE_ID;
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
    console.log(email, "rrrrr");
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
    });
    console.log(otp + "  otp");
    const mailOptions = {
      from: userEmail,
      to: email,
      subject: "shareit",
      html: `<p>Your shareit OTP is : ${otp}.</p><p>This will <b>expire in 3 minutes</b>.</p>`,
    };
    const salt = await bcrypt.genSalt(10);
    const hashedOtp = await bcrypt.hash(otp, salt);
    console.log("otp hashed  " + hashedOtp);
    const newOtp = new OTPModel({
      user: email,
      otp: hashedOtp,
      createdAt: Date.now(),
      expiresAt: Date.now() + 1000 * 60 * 3,
    });
    console.log(newOtp, "DDDDDD");
    await newOtp.save();
    console.log("otp saved");

    await transporter.sendMail(mailOptions);
    console.log("otp sent");
  } catch (error) {
    console.log(" otp email not sent");
    console.log(error);
    res.json({ status: false });
  }
};

// Register new user
export const registerUser = async (req, res) => {
  console.log(req.body, "registeruser");
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(req.body.password, salt);
  req.body.password = hashedPass;
  const newUser = new UserModel(req.body);
  console.log(newUser, "KKKKK");
  const { email } = req.body;
  console.log(email, "hhh");
  try {
    // addition new
    const oldUser = await UserModel.findOne({ email });

    if (oldUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // changed
    const user = await newUser.save();
    console.log(user, "fff");
    // const token = jwt.sign(
    //   { email: user.email, id: user._id },
    //   process.env.JWT_KEY,
    //   { expiresIn: "1h" }
    // );
    res.status(200).json({
      user,
      status: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

//LoginUser
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password, "credentials");
  try {
    const user = await UserModel.findOne({ email: email });
    // const { password, followers, following, ...otherdetails } = user._doc;
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
    console.log(item, "mobilenum");
    if (stringItem.match(/^[0-9+]{10,13}$/)) {
      console.log("mob");
      const otp = await sendmobileOTP(item);

      console.log({ status: true, otp });
      res.json({ status: true });
    } else {
      console.log("email");
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
    console.log(req.body.data, "ohhhh");
    const { OTP, type } = req.body.data;
    console.log(OTP, "ooooo");
    console.log(type, "dddd");
    console.log(OTP, type);
    const stringData = type.toString();
    if (stringData.match(/^[0-9+]{10,13}$/)) {
      console.log("its mobile nm");
      const verification = await verifymobileOTP(OTP, type);
      console.log(verification.status);
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
      console.log("its email");
      OTPModel.find({ user: type })
        .then(async (result) => {
          console.log(result);
          if (result.length > 0) {
            const { expiresAt } = result[result.length - 1];
            console.log(expiresAt);
            const sentOtp = result[result.length - 1].otp;
            if (expiresAt < Date.now()) {
              console.log("expired");
              OTPModel.findOneAndDelete({ user: type })
                .then(() => {
                  res.json({ status: false, message: "OTP Expired" });
                })
                .catch((error) => {
                  console.log(error);
                });
            } else {
              console.log(OTP + "  " + sentOtp);

              const same = await bcrypt.compare(OTP, sentOtp);
              if (same) {
                UserModel.updateOne(
                  { email: type },
                  { $set: { "verified.email": true } }
                )
                  .then((user) => {
                    console.log(user);
                    const token = jwt.sign(
                      { email: user.email, id: user._id },
                      process.env.JWT_KEY,
                      { expiresIn: "1h" }
                    );
                    console.log(token, "jjjj");
                    OTPModel.deleteMany({ user: type })
                      .then(() => {
                        UserModel.findOne({ email: type }).then((user) => {
                          res.json({
                            user,
                            token,
                          });
                        });
                      })
                      .catch((error) => {
                        console.log(error);
                      });
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              } else {
                res.json({ status: false, message: "Invalid OTP" });
              }
            }
          } else {
            res.json({ status: false, message: "No user found" });
          }
        })
        .catch((error) => {
          console.log(error);
          console.log("error in find");
        });
    }
  } catch (error) {
    next(error);
    console.log("errrrrrrr");
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
