import db from "#db/client";

export async function insertProduct(title, description, price) {
  try {
    const query = `
        INSERT INTO products(title, description, price)
        VALUES($1,$2, $3)
        RETURNING *
    `;
    const {
      rows: [product],
    } = await db.query(query, [title, description, price]);

    return product;
  } catch (error) {
    console.error(error);
  }
}

export async function getAllProducts() {
  try {
    const query = `SELECT * FROM products`;
    const { rows: products } = await db.query(query);

    return products;
  } catch (error) {
    console.error(error);
  }
}

export async function getProductById(id) {
  try {
    const query = `SELECT * FROM products WHERE id = $1`;
    const {
      rows: [product],
    } = await db.query(query, [id]);

    return product;
  } catch (error) {
    console.error(error);
  }
}

export async function getProductOrders(product_id) {
  try {
    const query = `
    SELECT o.id
    FROM orders AS o
    INNER JOIN orders_products AS op
    	ON op.order_id = o.id
    WHERE op.product_id = $1;
    `;

    const { rows: orders } = await db.query(query, [product_id]);
    return orders;
  } catch (error) {
    console.error(error);
  }
}
