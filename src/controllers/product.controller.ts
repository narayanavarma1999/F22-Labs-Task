import { Request, Response } from "express";
import { AppDataSource } from "../database/connection";
import { Product } from "../entities/product.entity";
import { Category } from "../entities/category.entity";
import { validate } from "class-validator";
import { error } from "console";

const productRepo = AppDataSource.getRepository(Product);
const categoryRepo = AppDataSource.getRepository(Category);

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, price, categoryId } = req.body;

    const category = await categoryRepo.findOneBy({ id: categoryId });
    if (!category)
      return res.status(404).json({ message: "Category not found" });

    const product = productRepo.create({ name, price, category });

    const errors = await validate(product);
    if (errors.length > 0) {
      return res.status(400).json(errors.map((e) => e.constraints));
    }

    const saved = await productRepo.save(product);
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", error: err });
  }
};

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await productRepo.find();
    if (!products) {
      return res.status(404).json({ message: "No Products found" });
    }
    res.status(200).json({ products });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Internal Server Error", err: error.message });
  }
};


export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, price } = req.body;

    const productId = parseInt(id);
    if (isNaN(productId)) {
      return res.status(404).json({ message: "Invalid product ID" });
    }

    const product = await productRepo.findOne({
      where: { id: productId },
      relations: ["category"],
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (name !== undefined) product.name = name;
    if (price !== undefined) product.price = price;

    const errors = await validate(product);
    if (errors.length > 0) {
      return res.status(400).json({
        message: "Validation failed",
        errors: errors.map((e) => e.constraints),
      });
    }

    const updatedProduct = await productRepo.save(product);

    return res.status(200).json({
      message: `Product with id:${id} updated successfully`,
      data: updatedProduct,
    });
  } catch (error: any) {
    console.error("Update Product Error:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};


