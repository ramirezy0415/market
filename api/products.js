import express from "express";
const router = express.Router();
export default router;

import { getAllProducts, getProductById } from "#db/queries/products";

router.get("/", async (req, res) => {
  try {
    const products = await getAllProducts();

    if (!products) return res.status(404).send("No products found.");
    return res.send(products);
  } catch (error) {
    console.error(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await getProductById(id);

    if (!product) return res.status(404).send("No product found.");
    return res.send(product);
  } catch (error) {
    console.error(error);
  }
});
