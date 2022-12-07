import { body } from "express-validator";

export const loginValidation = [
  body("email", "Invalid Email.").isEmail(),
  body("password", "Password not less than 5 characters").isLength({ min: 5 }),
];

export const registerValidation = [
  body("email", "Invalid Email.").isEmail(),
  body("password", "Password not less than 5 characters").isLength({ min: 5 }),
  body("fullName").isLength({ min: 3 }),
  body("avatarUrl").optional().isURL(),
];

export const postCreateValidation = [
  body("title", "Invalid Title").isLength(3).isString(),
  body("text", "Put Text").isLength({ min: 5 }),
  body("tags").optional().isString(),
  body("imageUrl ").optional().isString(),
];
