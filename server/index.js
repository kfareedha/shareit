import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import AuthRoute from "./Routes/AuthRoutes.js";
import UserRoute from "./Routes/UserRoutes.js";
import PostRoute from "./Routes/PostRoutes.js";
import UploadRoute from "./Routes/UploadRoutes.js";
import ChatRoute from "./Routes/ChatRoutes.js";
import MessageRoute from "./Routes/MessageRoutes.js";
import AdminRoute from "./Routes/adminRoutes.js";

import dotenv from "dotenv";
import cors from "cors";
import { mongoconnection } from "./connection/config.js";
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

app.listen(process.env.PORT, () =>
  console.log(`Listening at ${process.env.PORT}`)
);

//usage of Routes
app.use("/auth", AuthRoute);
app.use("/user", UserRoute);
app.use("/post", PostRoute);
app.use("/upload", UploadRoute);
app.use("/chat", ChatRoute);
app.use("/message", MessageRoute);
app.use("/admin", AdminRoute);
