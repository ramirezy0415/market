import express from "express";
const app = express();
export default app;

import userRouter from "#api/users";
import productRouter from "#api/products";

app.use(express.json());
app.use("/users", userRouter);
app.use("/products", productRouter);
