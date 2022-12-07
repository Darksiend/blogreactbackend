import express from "express";
import morgan from "morgan";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import {
  registerValidation,
  loginValidation,
  postCreateValidation,
} from "./validations/validations.js";
import { validationResult } from "express-validator";
import UserModel from "./models/User.js";

import checkAuth from "./utils/checkAuth.js";
import * as UserController from "./controllers/userController.js";
import * as PostController from "./controllers/PostController.js";
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

app.post("/auth/login", loginValidation, UserController.login);

app.post("/auth/register", registerValidation, UserController.register);

app.get("/auth/me", checkAuth, UserController.getMe);

app.get("/posts", checkAuth, PostController.getAll);

app.get("/posts/:id", checkAuth, PostController.getOne);

app.post("/posts", checkAuth, postCreateValidation, PostController.create);

app.delete("/posts/:id", checkAuth, PostController.remove);

app.patch("/posts/:id", checkAuth, PostController.update);

app.listen(port, (e) => {
  if (e) throw e;

  console.log("port: ", port);
});
