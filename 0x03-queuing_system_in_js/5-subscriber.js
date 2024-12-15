import { createClient } from "redis";

const client = createClient();
const channelName = "ALX channel";
const KILL_SERVER = "KILL_SERVER";

client.on("error", (err) => {
  console.log("Redis client not connected to the server:", err.toString());
});

client.on("connect", () => {
  console.log("Redis client connected to the server");
});

client.subscribe(channelName);

client.on("message", (_err, msg) => {
  console.log(msg);
  if (msg === KILL_SERVER) {
    client.unsubscribe();
    client.quit();
  }
});
