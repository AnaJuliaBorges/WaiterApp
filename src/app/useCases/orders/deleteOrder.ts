import { Request, Response } from "express";
import { Order } from "../../models/Order";

export async function cancelOrder(req: Request, res: Response){
  try {
    const { orderId } = req.params;

    const order = await Order.findByIdAndDelete(orderId);

     if (!order) {
      res.status(404).json({ error: "Order not found" });
      return;
    }

    res.sendStatus(204);
    return;

  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}
