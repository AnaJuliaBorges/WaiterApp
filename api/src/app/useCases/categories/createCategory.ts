import { Request, Response } from "express";
import { Category } from "../../models/Category";

export async function createCategories(req: Request, res: Response){
  try {
    const { icon, name } = req.body;

    if (!icon || !name) {
      res.status(400).json({ error: "Icon and name are required" });
      return;
    }

    const category = await Category.create({
      icon,
      name
    });

    res.status(201).json(category);
    return;

  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}
