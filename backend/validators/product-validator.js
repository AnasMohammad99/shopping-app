import { body } from "express-validator";

export const createValidator = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string")
    .isLength({ max: 100 })
    .withMessage("Name must not exceed 100 characters"),

  body("weight")
    .notEmpty()
    .withMessage("Weight is required")
    .isFloat({ gt: 0 })
    .withMessage("Weight must be a positive number"),

  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ gt: 0 })
    .withMessage("Price must be a positive number"),

  body("quantity")
    .notEmpty()
    .withMessage("Quantity is required")
    .isInt({ gt: 0 })
    .withMessage("Quantity must be a positive integer"),

  body("picture")
    .optional()
    .isObject()
    .withMessage("Picture must be an object")
    .custom((value, { req }) => {
      // If file is uploaded, ensure it exists in `req.file`
      if (req.file && !value) {
        throw new Error("Picture metadata is required if file is uploaded");
      }
      return true;
    }),
];
export const updateValidator = [
  body("name")
    .optional()
    .isString()
    .withMessage("Name must be a string")
    .isLength({ max: 100 })
    .withMessage("Name must not exceed 100 characters"),

  body("weight")
    .optional()
    .isFloat({ gt: 0 })
    .withMessage("Weight must be a positive number"),

  body("price")
    .optional()
    .isFloat({ gt: 0 })
    .withMessage("Price must be a positive number"),

  body("quantity")
    .optional()
    .isInt({ gt: 0 })
    .withMessage("Quantity must be a positive integer"),

  body("picture")
    .optional()
    .isObject()
    .withMessage("Picture metadata must be an object"),
];
