import kue from "kue";

const jobData = {
  phoneNumber: "07020948202",
  message: "Hello world!",
};

const queue = kue.createQueue();
const job = queue.create("push_notification_code", jobData).save((err) => {
  if (!err) console.log("Notification job created: ", job.id);
});
job.on("complete", () => {
  console.log("Notification job completed");
});
job.on("failed", () => {
  console.log("Notification job failed");
});
