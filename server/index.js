import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import AuthRoute from "./Routes/AuthRoutes.js";
import UserRoute from "./Routes/UserRoutes.js";
import PostRoute from "./Routes/PostRoutes.js";
import UploadRoute from "./Routes/UploadRoutes.js";
import dotenv from "dotenv";
import cors from "cors";
//Routes
const app = express();
//to serve images for public
app.use(express.static("public"));
app.use("/images", express.static("images"));
//Middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
dotenv.config();
mongoose
  .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(process.env.PORT, () =>
      console.log(`Listening at ${process.env.PORT}`)
    )
  )
  .catch((error) => console.log(error));
//usage of Routes
app.use("/auth", AuthRoute);
app.use("/user", UserRoute);
app.use("/posts", PostRoute);
app.use("/upload", UploadRoute);
