const { startServer } = require("./server");
const logger = require("./services/logger.service")(module);
const { sampleDB } = require("./services/database.service");

(async () => {
  try {
    await sampleDB.connect();
    startServer();
  } catch (error) {
    logger.error(error.message);
    await sampleDB.disconnect();
    logger.shutdown(() => process.exit(1));
  }
})();

["SIGINT", "SIGTERM", "SIGQUIT"].forEach((signal) =>
  process.on(signal, async () => {
    await sampleDB.disconnect();
    logger.info(`Caught signal ${signal}`);
    logger.shutdown(() => process.exit(0));
  })
);

process.on("uncaughtException", async (error) => {
  await sampleDB.disconnect();
  logger.error(`Uncaught exception! ${error.message}`);
  logger.shutdown(() => process.exit(1));
});
