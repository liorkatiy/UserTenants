const jwt = require("jsonwebtoken");
const accountHandler = require("./DBHandlers/accountHandler");
const {
  JWTSecret
} = require("./config.json");
const logger = require("./DBHandlers/loggerHandler");

const timeBeforeReToken = 15 * 60;
const timeBeforeReLogin = timeBeforeReToken * 2;

async function sign(id) {
  let result = await jwt.sign({
    id
  }, JWTSecret);
  return result;
}


/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {*} next 
 */
async function verifyToken(req, res, next) {
  const token = req.headers['authorization']; //get token from header
  if (!token) { //no token than send error
    res.sendData({
      error: "login"
    });
    return;
  }
  try {
    let user = await jwt.verify(token, JWTSecret); // verify the token
    const timeSinceLogin = new Date().getTime() / 1000 - user.iat; // get the time since token last update
    if (timeSinceLogin > timeBeforeReLogin) { // user idle for to long auto logout
      logger.createLog('Login Timeout:' + timeSinceLogin, user.id);
      res.sendData({
        error: "login"
      });
      return;
    }

    if (timeSinceLogin > timeBeforeReToken) { // refresh token and compare the current token with the last token in the database
      const newToken = await sign(user.id);
      const valid = await accountHandler.validateToken(user.id, token, newToken);
      if (valid) {
        res.cookie("userToken", newToken);
      } else {
        res.sendData({
          error: "login"
        });
      }
    }
    req.user = user;
    next();
  } catch (e) { // if error happen send cant authunticate probbly the jwt.verify function failed
    res.sendData({
      error: "login"
    });
  }
}




module.exports = {
  verifyToken,
  sign
};