import kue from "kue";

const blackListedPhoneNumbers = ["4153518780", "4153518781"];

/**
 * Sends a push notification to a user.
 * @param {String} phoneNumber
 * @param {String} message
 * @param {kue.Job} job
 * @param {*} done
 */
function sendNotification(phoneNumber, message, job, done) {
  let total = 2,
    pending = 2;
  let sendInterval = setInterval(() => {
    job.progress(total - pending, total);
    if (blackListedPhoneNumbers.includes(phoneNumber)) {
      done(new Error(`Phone number ${phoneNumber} is blacklisted`));
      clearInterval(sendInterval);
      return;
    }
    if (total === pending) {
      console.log(
        `Sending notification to ${phoneNumber}, with message: ${message}`,
      );
    }
    --pending || done();
    pending || clearInterval(sendInterval);
  }, 1000);
}

const queue = kue.createQueue();

queue.process("push_notification_code_2", 2, (job, done) => {
  sendNotification(job.data.phoneNumber, job.data.message, job, done);
});
