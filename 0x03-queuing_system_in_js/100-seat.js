import express from "express";
import kue from "kue";
import { promisify } from "util";
import { createClient } from "redis";

/**
 * Reserves a seat
 * @param {Number} number - number of seat
 */
function reserveSeat(number) {
  return promisify(client.SET).bind(client)("available_seats", number);
}

/**
 * Gets the number of current available seats
 */
function getCurrentAvailableSeats() {
  return promisify(client.GET).bind(client)("available_seats");
}

const client = createClient({ name: "reserve_seat" });
const NO_OF_AVAILABLE_SEATS = 50;
let reservationEnabled = true;

const queue = kue.createQueue();

const app = express();
const PORT = 1245;

app.get("/available_seats", async (req, res) => {
  const numberOfAvailableSeats = await getCurrentAvailableSeats();
  res.json({ numberOfAvailableSeats });
});

app.get("/reserve_seat", (req, res) => {
  if (!reservationEnabled) {
    return res.json({ status: "Reservation are blocked" });
  }
  const newReservationJob = queue.create("reserve_seat", {});
  newReservationJob
    .on("complete", () => {
      console.log(`Seat reservation job ${newReservationJob.id} completed`);
    })
    .on("failed", (err) => {
      console.log(
        `Seat reservation job ${newReservationJob.id} failed: ${err.message || err.toString()}`,
      );
    })
    .save((err) => {
      if (!err) return res.json({ status: "Reservation in process" });
      res.json({ status: "Reservation failed" });
    });
});

app.get("/process", (req, res) => {
  res.json({ status: "Queue processing" });
  queue.process("reserve_seat", async (job, done) => {
    const noOfAvailableSeats =
      Number.parseInt(await getCurrentAvailableSeats()) || 0;
    if (noOfAvailableSeats <= 1) {
      reservationEnabled = false;
    }
    if (noOfAvailableSeats >= 1) {
      await reserveSeat(noOfAvailableSeats - 1);
      return done();
    }
    done(Error("Not enough seats available"));
  });
});

app.listen(PORT, async () => {
  await reserveSeat(NO_OF_AVAILABLE_SEATS);
  console.log(`app running on localhost port ${PORT}`);
});

export default app;
