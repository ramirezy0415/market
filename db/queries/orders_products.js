import db from "#db/client";

export async function insertOrderProducts(order_id, product_id, quantity) {
  try {
    const query = `
        INSERT INTO orders_products(order_id, product_id, quantity)
        VALUES($1,$2, $3)
        RETURNING *
    `;
    const {
      rows: [order_product],
    } = await db.query(query, [order_id, product_id, quantity]);

    return order_product;
  } catch (error) {
    console.error(error);
  }
}
