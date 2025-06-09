import { Request, Response } from "express";
import { Order } from "../../models/Order";

export async function changeOrderStatus(req: Request, res: Response){
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    if(!['WAITING', 'IN_PRODUCTION', 'DONE'].includes(status)) {
      res.status(400).json({ error: "Status should be one of these: WAITING, IN_PRODUCTION, DONE" });
      return;
    }

    if (!orderId || !status) {
      res.status(400).json({ error: "Order ID and status are required" });
      return;
    }

    const order = await Order.findByIdAndUpdate(orderId, { status });

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
