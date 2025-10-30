import { Router } from "express";
import {
  createCategory,
  getCategoryProducts,
} from "../controllers/category.controller";

const router = Router();

router.get("/:id/products", getCategoryProducts);
router.post("/", createCategory);

export default router;
