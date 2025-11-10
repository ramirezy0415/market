import express from "express";
const router = express.Router();
export default router;

import {
  getOrdersByUserId,
  insertOrder,
  getOrdersByOrderId,
  getOrderProducts,
} from "#db/queries/orders";
import requireUser from "#middleware/requireUser";
import requireBody from "#middleware/requireBody";

import getUserFromToken from "#middleware/getUserFromToken";
router.use(getUserFromToken);
router.use(requireUser);

router.get("/", async (req, res) => {
  try {
    const orders = await getOrdersByUserId(req.user.id);
    if (!orders) res.status(403).send("No orders under user ");
    return res.status(200).send(orders);
  } catch (error) {
    console.error(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user.id;
    const order = await getOrdersByOrderId(id);
    if (!order) {
      return res.status(404).send(`Orders with id ${id} do not exist`);
    }

    if (order.user_id != user_id) {
      return res.status(403).send(`User is not owner of order with id ${id}`);
    }

    return res.status(200).send(order);
  } catch (error) {
    console.error(error);
  }
});

router.get("/:id/products", async (req, res) => {
  try {
    const { id } = req.params;
    const order_products = await getOrderProducts(id);
    return res.status(200).send(order_products);
  } catch (error) {
    console.error(error);
  }
});

router.post("/", requireBody(["date"]), async (req, res) => {
  try {
    const { id } = req.user;
    const { date, note } = req.body;

    const order = await insertOrder(date, note, id);
    if (!order) return res.status(500).send("Unable to insert order.");

    return res.status(201).send(order);
  } catch (error) {
    console.error(error);
  }
});
