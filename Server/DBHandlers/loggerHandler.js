const logger = require("../DBmodels/loggerModel");

async function createLog(event, userid) {
  await logger.create({
    event,
    timestamp: Date.now(),
    userid
  });
}

module.exports = {
  createLog
};