import kue from "kue";

const jobData = {
  phoneNumber: "07020948202",
  message: "Hello world!",
};

const queue = kue.createQueue();

/**
 * @param {string} phoneNumber - phone number
 * @param {string} message - message
 */
function sendNotification(phoneNumber, message) {
  console.log(
    `Sending notification to ${phoneNumber}, with message: ${message}`,
  );
}

queue.process("push_notification_code", (job, done) => {
  sendNotification(job.data.phoneNumber, job.data.message);
  done();
});
