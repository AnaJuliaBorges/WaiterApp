import { Request, Response } from "express";
import { Product } from "../../models/Product";

export async function createProduct(req: Request, res: Response){
  try {
    const imagePath = req.file?.filename;
    const { name, description, price, category, ingredients } = req.body;

    if (!imagePath || !name || !description || !price || !category) {
      res.status(400).json({ error: "All fields are required" });
    }

    const product = await Product.create({
      name,
      description,
      price: Number(price),
      category,
      imagePath,
      ingredients: ingredients ? JSON.parse(ingredients) : [],
    })

    res.status(201).json(product);
    return;

  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}
