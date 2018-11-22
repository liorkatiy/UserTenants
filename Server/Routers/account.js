const accountHandler = require("../DBHandlers/accountHandler");
const express = require("express");
const router = express.Router();
const jwt = require("../jwt");
const logger = require("../DBHandlers/loggerHandler")

router.post("/login",
  async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let verify = await accountHandler.validateUser(username, password); // validate the user
    if (verify.verify) {
      const token = await jwt.sign(verify.id); //sign token for the user
      await accountHandler.signToken(verify.id, token);
      res.cookie("userToken", token); //send the user the token cookie
    }
    res.sendData(verify.verify);
  });

router.post("/register",
  async (req, res) => {
    let n = req.body.username;
    let p = req.body.password;
    try {
      await accountHandler.createUser(n, p);
      res.sendData(true);
    } catch (e) {
      res.sendData({
        error: e
      });
    }
  });

router.post("/logout",
  jwt.verifyToken,
  async (req, res) => {
    await logger.createLog("User LogOut", req.user.id);
    res.sendData(true);
  });

module.exports = router;