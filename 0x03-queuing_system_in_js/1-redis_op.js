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
function setNewSchool(schoolName, value) {
  client.SET(schoolName, value, print);
}

/**
 * @param {string} schoolName - key
 */
function displaySchoolValue(schoolName) {
  client.GET(schoolName, (_err, value) => {
    console.log(value);
  });
}

displaySchoolValue("ALX");
setNewSchool("ALXSanFrancisco", "100");
displaySchoolValue("ALXSanFrancisco");
