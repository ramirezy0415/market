import db from "#db/client";

export async function insertOrder(date, note, user_id) {
  try {
    if (!date) {
      date = new Date();
    }

    const query = `
        INSERT INTO orders(date,note,user_id)
        VALUES($1,$2, $3)
        RETURNING *
    `;

    const {
      rows: [order],
    } = await db.query(query, [date, note, user_id]);

    return order;
  } catch (error) {
    console.error(error);
  }
}

export async function getOrdersByUserById(id) {
  try {
    const query = ` SELECT * FROM orders WHERE user_id = $1;`;
    const { rows: orders } = await db.query(query, [id]);
    return orders;
  } catch (error) {
    console.error(error);
  }
}
