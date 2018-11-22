const logger = require("../DBmodels/loggerModel");

//create new log
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