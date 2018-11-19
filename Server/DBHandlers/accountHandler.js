const userModel = require("../DBmodels/userModel");
const logger = require("./loggerHandler");
const bcyrpt = require("bcryptjs");

async function createUser(name, password) {
  const passwordcryped = await hashPassword(password);

  const user = await userModel.create({
    username: name,
    password: passwordcryped,
    token: ""
  });
  logger.createLog("User Created", user._id);
}

async function hashPassword(password) {
  let salt = await bcyrpt.genSalt();
  let hashedPassword = await bcyrpt.hash(password, salt);
  return hashedPassword;
}

async function validateUser(username, password) {
  let user = await userModel.findOne({
    username
  });
  if (user && await bcyrpt.compare(password, user.password)) {
    return {
      id: user._id,
      verify: true
    };
  }
  return {
    verify: false
  }
}

async function validateToken(id, currentToken, newToken) {
  let result = await userModel.update({
    _id: id,
    token: currentToken
  }, {
    token: newToken
  });
  return result;
}

async function signToken(_id, token) {
  let result = await userModel.update({
    _id,
  }, {
    token
  });
  return result.nModified > 0;
}

module.exports = {
  createUser,
  validateUser,
  validateToken,
  signToken
};