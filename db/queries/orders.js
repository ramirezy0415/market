import db from "#db/client";

export async function insertOrder(note, user_id) {
  try {
    const current_date = new Date();
    const query = `
        INSERT INTO orders(date,note,user_id)
        VALUES($1,$2, $3)
        RETURNING *
    `;
    const {
      rows: [order],
    } = await db.query(query, [current_date, note, user_id]);

    return order;
  } catch (error) {
    console.error(error);
  }
}
