import db from "#db/client";
import { faker } from "@faker-js/faker";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

import { insertProduct } from "#db/queries/products";
import { insertUser } from "#db/queries/users";
import { insertOrder } from "#db/queries/orders";
import { insertOrderProducts } from "#db/queries/orders_products";

async function seed() {
  /*The database is seeded with 10 different products */
  try {
    let insertedProducts = [];
    for (let i = 0; i <= 10; i++) {
      insertedProducts[i] = await insertProduct(
        faker.commerce.product(),
        faker.commerce.productDescription(),
        faker.commerce.price()
      );
    }

    /*At least 1 user */
    let insertedUsers = [];
    for (let i = 0; i <= 2; i++) {
      insertedUsers[i] = await insertUser(
        faker.internet.username(),
        faker.internet.password()
      );
    }

    /*who has made at least 1 order of at least 5 distinct products.  */

    const userorder = await insertOrder("First order", insertedUsers[0].id);
    await insertOrderProducts(userorder.id, insertedProducts[0].id, 1);
    await insertOrderProducts(userorder.id, insertedProducts[1].id, 1);
    await insertOrderProducts(userorder.id, insertedProducts[2].id, 1);
    await insertOrderProducts(userorder.id, insertedProducts[3].id, 1);
    await insertOrderProducts(userorder.id, insertedProducts[4].id, 1);
  } catch (error) {
    console.error(error);
  }
}
