import kue from "kue";

/**
 * Creates push notification
 * @param {Array<Object>} jobs
 * @param {kue.Queue} queue
 */
function createPushNotification(jobs, queue) {
  if (!Array.isArray(jobs)) {
    throw new Error("Jobs is not an array");
  }
  for (const job of jobs) {
    const newJob = queue.create("push_notification_code_3", job);
    newJob
      .on("enqueue", () => {
        console.log("Notification job created:", job.id);
      })
      .on("complete", () => {
        console.log(`Notification job ${newJob.id} completed`);
      })
      .on("failed", (err) => {
        console.log(
          `Notification job ${newJob.id} failed: `,
          err.message || err.toString(),
        );
      })
      .on("progress", (progress, data) => {
        console.log(`Notification job ${newJob.id} ${progress}% complete`);
      });
    newJob.save();
  }
}

export default createPushNotification;
