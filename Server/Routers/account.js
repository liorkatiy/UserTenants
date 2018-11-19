const accountHandler = require("../DBHandlers/accountHandler");
const express = require("express");
const router = express.Router();
const jwt = require("../jwt");

router.post("/login",
  async (req, res) => {
    let username = req.body.userName;
    let password = req.body.password;
    let verify = await accountHandler.validateUser(username, password);
    if (verify.verify) {
      const token = await jwt.sign(verify.id);
      await accountHandler.signToken(verify.id, token);
      res.cookie("userToken", token);
    }
    res.sendData(verify.verify);
  });

router.post("/register",
  async (req, res) => {
    let n = req.body.userName;
    let p = req.body.password;
    try {
      await accountHandler.createUser(n, p);
      res.sendData(true);
    } catch (e) {
      res.sendError(e);
    }
  });

module.exports = router;