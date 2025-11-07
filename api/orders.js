import express from "express";
const router = express.Router();
export default router;

import { getOrdersByUserById } from "#db/queries/orders";
import requireUser from "#middleware/requireUser";

import getUserFromToken from "#middleware/getUserFromToken";
router.use(getUserFromToken);
router.use(requireUser);

router.get("/", async (req, res) => {
  try {
    const orders = await getOrdersByUserById(req.user.id);
    if (!orders) res.status(403).send("No orders under user ");
    return res.status(200).send(orders);
  } catch (error) {
    console.error(error);
  }
});
