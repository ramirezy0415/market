import db from "#db/client";
import bcrypt from "bcrypt";

export async function insertUser(username, password) {
  try {
    const query = `
        INSERT INTO users(username, password)
        VALUES($1,$2)
        RETURNING *
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
