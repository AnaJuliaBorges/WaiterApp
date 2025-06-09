import { Request, Response } from "express";
import { Order } from "../../models/Order";

export async function createOrder(req: Request, res: Response){
  try {
    const { table, products } = req.body;

    if (!table || !products) {
      res.status(400).json({ error: "Table and products are required" });
      return;
    }

    const order = await Order.create({
      table,
      products
    });

    res.status(201).json(order);
    return;

  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}
