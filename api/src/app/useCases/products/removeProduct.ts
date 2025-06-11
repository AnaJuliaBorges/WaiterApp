import { Request, Response } from "express";
import { Product } from "../../models/Product";

export async function removeProduct(req: Request, res: Response){
  try {
    const { productId } = req.params;

    const product = await Product.findByIdAndDelete(productId);

    if (!product) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    res.sendStatus(204);
    return;

  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}
