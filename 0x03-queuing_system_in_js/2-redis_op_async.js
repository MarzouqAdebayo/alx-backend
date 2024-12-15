import { promisify } from "util";
import { createClient, print } from "redis";

const client = createClient();

client.on("error", (err) => {
  console.log("Redis client not connected to the server:", err.toString());
});

client.on("connect", () => {
  console.log("Redis client connected to the server");
});

/**
 * @param {string} schoolName - key
 * @param {string} value - value
 */
async function setNewSchool(schoolName, value) {
  await promisify(client.SET).bind(client)(schoolName, value, print);
}

/**
 * @param {string} schoolName - key
 */
async function displaySchoolValue(schoolName) {
  console.log(await promisify(client.GET).bind(client)(schoolName));
}

(async () => {
  await displaySchoolValue("ALX");
  await setNewSchool("ALXSanFrancisco", "100");
  await displaySchoolValue("ALXSanFrancisco");
})();
