import { Request, Response } from "express";
import { AppDataSource } from "../database/connection";
import { Product } from "../entities/product.entity";
import { Category } from "../entities/category.entity";

const productRepo = AppDataSource.getRepository(Product);
const categoryRepo = AppDataSource.getRepository(Category);

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    const category = await categoryRepo.create({ name });
    if (!category) {
      return res.status(404).json({ message: "Category not Created" });
    }
    const saved = await categoryRepo.save(category);
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", error: err });
  }
};

export const getCategoryProducts = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const category = await categoryRepo.findOneBy({ id: parseInt(id) });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const products = await productRepo.find({
      where: { category: { id: category.id } },
      relations: ["category"],
    });

    res.json({
      category: category.name,
      products,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
