import sinon from "sinon";
import { expect } from "chai";
import { createQueue } from "kue";
import createPushNotification from "./8-job.js";

describe("description", () => {
  const consoleSpy = sinon.spy(console);
  const QUEUE = createQueue({ name: "push_notification_test" });
  before(() => {
    QUEUE.testMode.enter(true);
  });
  //afterEach(() => {
  //});
  after(() => {
    QUEUE.testMode.clear();
    QUEUE.testMode.exit();
  });
  it("should display error message if jobs is not an array", () => {
    expect(() => createPushNotification(null, QUEUE)).to.throw(
      "Jobs is not an array",
    );
  });

  it("should add jobs to the queue with the correct type", () => {
    expect(QUEUE.testMode.jobs.length).to.eq(0);
    const jobData = [
      {
        phoneNumber: "44556677889",
        message: "Use the code 1982 to verify your account",
      },
      {
        phoneNumber: "98877665544",
        message: "Use the code 1738 to verify your account",
      },
    ];
    createPushNotification(jobData, QUEUE);
    expect(QUEUE.testMode.jobs.length).to.equal(2);
    expect(QUEUE.testMode.jobs[0].data).to.deep.equal(jobData[0]);
    expect(QUEUE.testMode.jobs[0].type).to.equal("push_notification_code_3");
  });

  it("should register progress event handler for a job", (done) => {
    QUEUE.testMode.jobs[0].addListener("progress", (progress) => {
      expect(
        consoleSpy.log.calledWith(
          `Notification job ${QUEUE.testMode.jobs[0].id} ${progress}% complete`,
        ),
      ).to.be.true;
      done();
    });
    QUEUE.testMode.jobs[0].emit("progress", 40);
  });

  it("should register complete event handler for a job", (done) => {
    QUEUE.testMode.jobs[0].addListener("complete", () => {
      expect(
        consoleSpy.log.calledWith(
          `Notification job ${QUEUE.testMode.jobs[0].id} completed`,
        ),
      ).to.be.true;
      done();
    });
    QUEUE.testMode.jobs[0].emit("complete");
  });

  it("should register failed event handler for a job", (done) => {
    QUEUE.testMode.jobs[0].addListener("failed", () => {
      expect(
        consoleSpy.log.calledWith(
          `Notification job ${QUEUE.testMode.jobs[0].id} failed: `,
          "Failed to send",
        ),
      ).to.be.true;
      done();
    });
    QUEUE.testMode.jobs[0].emit("failed", new Error("Failed to send"));
  });
});
