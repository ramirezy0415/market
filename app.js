import express from "express";
const app = express();
export default app;

import userRouter from "#api/users";

app.use(express.json());
app.use("/users", userRouter);
