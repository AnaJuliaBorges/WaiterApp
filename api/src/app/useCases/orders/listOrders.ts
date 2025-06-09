import { Request, Response } from "express";
import { Order } from "../../models/Order";

export async function listOrders(req: Request, res: Response){
  try {
    const orders = await Order.find()
      .sort({ createdAt: 1 }) // Sort by creation date, ascending
      .populate('products.product');

    res.json(orders);
    return

  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }

}
