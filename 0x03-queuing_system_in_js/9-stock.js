import express from "express";
import { promisify } from "util";
import { createClient } from "redis";

const listProducts = [
  {
    itemId: 1,
    itemName: "Suitcase 250",
    price: 50,
    initialAvailableQuantity: 4,
  },
  {
    itemId: 2,
    itemName: "Suitcase 450",
    price: 100,
    initialAvailableQuantity: 10,
  },
  {
    itemId: 3,
    itemName: "Suitcase 650",
    price: 350,
    initialAvailableQuantity: 2,
  },
  {
    itemId: 4,
    itemName: "Suitcase 1050",
    price: 550,
    initialAvailableQuantity: 5,
  },
];

/**
 * Find item in products list
 * @param {Number} id - id of the item
 * @return {*}
 * */
function getItemById(id) {
  return listProducts.find((item) => item.itemId === id);
}

/**
 * Set item in redis
 * @param {Number} itemId - id of the item
 * @param {Number} stock - stock value of the item
 * */
async function reserveStockById(itemId, stock) {
  return promisify(client.SET).bind(client)(`item.${itemId}`, stock);
}

/**
 * Set item in redis
 * @param {Number} itemId - id of the item
 */
async function getCurrentReservedStockById(itemId) {
  return promisify(client.GET).bind(client)(`item.${itemId}`);
}

/**
 * Resets all product stock
 */
const resetProductsStock = () => {
  return Promise.all(
    listProducts.map((item) =>
      promisify(client.SET).bind(client)(`item.${item.itemId}`, 0),
    ),
  );
};

const app = express();
const PORT = 1245;

const client = createClient();

app.get("/list_products", (req, res) => {
  res.json(listProducts);
});

app.get("/list_products/:itemId(\\d+)", async (req, res) => {
  const itemId = Number.parseInt(req.params.itemId);
  const item = getItemById(itemId);
  if (!item) {
    return res.json({ status: "Product not found" });
  }
  const reservedStock =
    Number.parseInt(await getCurrentReservedStockById(itemId)) || 0;
  item.currentQuantity = item.initialAvailableQuantity - reservedStock;
  res.json(item);
});

app.get("/reserve_product/:itemId(\\d+)", async (req, res) => {
  const itemId = Number.parseInt(req.params.itemId);
  const item = getItemById(itemId);
  if (!item) {
    return res.json({ status: "Product not found" });
  }
  const reservedStock =
    Number.parseInt(await getCurrentReservedStockById(itemId)) || 0;
  if (reservedStock >= item.initialAvailableQuantity) {
    return res.json({ status: "Not enough stock available", itemId });
  }
  await reserveStockById(itemId, reservedStock + 1);
  res.json({ status: "Reservation confirmed", itemId });
});

app.listen(PORT, async () => {
  await resetProductsStock();
  console.log(`app running on localhost port ${PORT}`);
});

export default app;
