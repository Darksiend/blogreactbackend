import express from "express";
import morgan from "morgan";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cors from "cors";
import mongoose from "mongoose";
import {
  registerValidation,
  loginValidation,
  postCreateValidation,
} from "./validations/validations.js";
import { validationResult } from "express-validator";
import UserModel from "./models/User.js";

import checkAuth from "./utils/checkAuth.js";
import { UserController, PostController } from "./controllers/index.js";
import handleValidationErrors from "./utils/handleValidationErrors.js";
const port = 4444;
const app = express();

app.use(morgan("dev"));

mongoose
  .connect(
    "mongodb+srv://darksiend:123@mycluster.eswzs4i.mongodb.net/blog?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("DB Ok!");
  })
  .catch((e) => console.log("DB Error", e));
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(express.json());
app.use(cors());
app.post(
  "/auth/login",

  loginValidation,
  handleValidationErrors,
  UserController.login
);

app.post(
  "/auth/register",
  registerValidation,
  handleValidationErrors,
  UserController.register
);

app.get("/auth/me", checkAuth, UserController.getMe);

app.get("/posts", PostController.getAll);

app.get("/tags", PostController.getLastTags);

app.get("posts/tags", PostController.getLastTags);

app.get("/posts/:id", PostController.getOne);

app.post(
  "/posts",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.create
);

app.delete("/posts/:id", checkAuth, PostController.remove);

app.patch("/posts/:id", checkAuth, PostController.update);

app.listen(port, (e) => {
  if (e) throw e;

  console.log("port:", port);
});
