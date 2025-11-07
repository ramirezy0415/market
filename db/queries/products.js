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
