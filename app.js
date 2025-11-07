import express from "express";
const app = express();
export default app;

import userRouter from "#api/users";
import productRouter from "#api/products";
import ordersRouter from "#api/orders";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/orders", ordersRouter);
