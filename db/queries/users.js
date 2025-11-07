import bcrypt from "bcrypt";
import db from "#db/client";

export async function insertUser(username, password) {
  try {
    const query = `
        INSERT INTO users(username, password)
        VALUES($1,$2)
        RETURNING *;
    `;
    const hashedPassword = await bcrypt.hash(password, 10);
    const {
      rows: [user],
    } = await db.query(query, [username, hashedPassword]);

    return user;
  } catch (error) {
    console.error(error);
  }
}

export async function getUser(username, password) {
  try {
    const query = `
    SELECT * FROM users WHERE username = $1;
    `;
    const {
      rows: [user],
    } = await db.query(query, [username]);

    // If user does not exist
    if (!user) return null;

    // If user exists compare password
    const validUser = await bcrypt.compare(password, user.password);

    // If invalid password
    if (!validUser) return null;

    return user;
  } catch (error) {
    console.error(error);
  }
}
export async function getUserById(id) {
  try {
    const query = `SELECT * FROM users WHERE id = $1;`;
    const {
      rows: [user],
    } = await db.query(query, [id]);

    return user;
  } catch (error) {
    console.error(error);
  }
}
