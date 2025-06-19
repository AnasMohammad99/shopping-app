import express from "express";
import {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getProduct,
} from "../controllers/product-controller.js";
import {
  createValidator,
  updateValidator,
} from "../validators/product-validator.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProduct);
router.post("/", upload.single("picture"), createValidator, addProduct);
router.patch("/:id", upload.single("picture"), updateValidator, updateProduct);
router.delete("/:id", deleteProduct);

export default router;
