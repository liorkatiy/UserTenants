const jwt = require("jsonwebtoken");
const accountHandler = require("./DBHandlers/accountHandler");
const {
  JWTSecret
} = require("./config.json");


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
  const token = req.headers['authorization'];
  if (!token) {
    res.sendError("login");
    return;
  }
  try {
    let user = await jwt.verify(token, JWTSecret);
    const timeSinceLogin = new Date().getTime() / 1000 - user.iat;
    if (timeSinceLogin > timeBeforeReLogin) {
      res.sendError("login");
      return;
    }

    if (timeSinceLogin > timeBeforeReToken) {
      const newToken = await sign(user.id);
      const valid = await accountHandler.validateToken(user.id, token, newToken);
      if (valid) {
        res.cookie("userToken", newToken);
      } else {
        res.sendError("login");
        return;
      }
    }
    req.user = user;
    next();
  } catch (e) {
    res.sendError("auth");
  }
}




module.exports = {
  verifyToken,
  sign
};