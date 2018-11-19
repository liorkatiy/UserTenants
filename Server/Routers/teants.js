const tenantHandler = require("../DBHandlers/tenantHandler");
const express = require("express");
const router = express.Router();

router.get("/",
  async (req, res) => {
    const id = req.query.id;
    try {
      let result = await tenantHandler.get(id);
      res.sendData(result);
    } catch (e) {
      res.sendError();
    }
  });

router.post("/",
  async (req, res) => {
    const tenant = req.body;
    let result = await tenantHandler.create(tenant);
    res.sendData(result);
  });

router.put("/",
  async (req, res) => {
    const tenant = req.body;
    let result = await tenantHandler.update(tenant);
    res.sendData(result);
  });

router.delete("/",
  async (req, res) => {
    const id = req.body.id;
    let result = await tenantHandler.remove(id);
    res.sendData(result);
  });

module.exports = router;