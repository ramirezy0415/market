import express from "express";
const router = express.Router();
export default router;

import requireBody from "#middleware/requireBody";
import { createToken } from "#utils/jwt";
import { getUser, insertUser } from "#db/queries/users";

/**
POST /users/register
sends 400 if request body is missing username or password
creates a new user with the provided credentials and sends a token
the password should be hashed in the database
 */
router.post(
  "/register",
  requireBody(["username", "password"]),
  async (req, res) => {
    try {
      // get username and password
      const { username, password } = req.body;

      // insert user into database
      const registered = await insertUser(username, password);

      // creates a new user with the provided credentials and sends a token
      const token = createToken({ id: registered.id });
      return res.status(201).send(token);
    } catch (error) {
      console.error(error);
    }
  }
);

/*
POST /users/login
sends 400 if request body is missing username or password
sends a token if the provided credentials are valid
 */
router.post(
  "/login",
  requireBody(["username", "password"]),
  async (req, res) => {
    try {
      // get username and password
      const { username, password } = req.body;

      // insert user into database
      const user = await getUser(username, password);

      if (!user) return res.status(401).send("Invalid user credentials");

      // creates a new user with the provided credentials and sends a token
      const token = createToken({ id: user.id });
      return res.send(token);
    } catch (error) {
      console.error(error);
    }
  }
);
