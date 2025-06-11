import { Request, Response } from "express";
import { Category } from "../../models/Category";

export async function editCategories(req: Request, res: Response){
  try {
    const { categoryId } = req.params;
    const { name } = req.body;

    if (!categoryId || !name) {
      res.status(400).json({ error: "Category ID and name are required" });
      return;
    }

    const category = await Category.findByIdAndUpdate(categoryId, { name });

    if (!category) {
      res.status(404).json({ error: "Category not found" });
      return;
    }

    res.sendStatus(204);
    return;

  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}
