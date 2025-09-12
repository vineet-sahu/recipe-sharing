import { body } from "express-validator";


export const loginValidator = [
    body("email").isEmail().withMessage("Valid email required"),
    body("password").isLength({min: 6}).withMessage("Password must be at least 6 characters long"),
];

export const signUpValidator = [
    body("username")
        .isString().withMessage("Username must be a string")
        .isLength({ min: 3, max: 30 }).withMessage("Username must be between 3 and 30 characters"),
    body("email")
        .isEmail().withMessage("Invalid email address"),
    body("password")
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long")
];