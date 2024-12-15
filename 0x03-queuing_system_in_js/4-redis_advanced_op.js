import { createClient, print } from "redis";

const client = createClient();

client.on("error", (err) => {
  console.log("Redis client not connected to the server:", err.toString());
});

client.on("connect", () => {
  console.log("Redis client connected to the server");
});

/**
 * @param {string} hashKey - Key to the hashtable
 * @param {string} fieldName - name of hash field
 * @param {string} fieldValue - value of hash field
 */
function updateHash(hashKey, fieldName, fieldValue) {
  client.HSET(hashKey, fieldName, fieldValue, print);
}

/**
 * @param {string} hashKey - Key to the hashtable
 */
function printAll(hashKey) {
  client.HGETALL(hashKey, (_err, reply) => console.log(reply));
}

const obj = {
  Portland: 50,
  Seattle: 80,
  "New York": 20,
  Bogota: 20,
  Cali: 40,
  Paris: 2,
};
const hashKey = "HolbertonSchools";

for (const [field, value] of Object.entries(obj)) {
  updateHash(hashKey, field, value);
}

printAll(hashKey);
