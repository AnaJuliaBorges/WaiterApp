import { Request, Response } from "express";
import { Order } from "../../models/Order";
import { io } from "../../..";

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
    const orderDetails = await order.populate('products.product');

    io.emit('orders@new', orderDetails);
    res.status(201).json(order);
    return;

  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}
