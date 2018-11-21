const tenantHandler = require("../DBHandlers/tenantHandler");
const express = require("express");
const router = express.Router();

router.get("/",
  async (req, res) => {
    const search = req.query.search;
    let result = await tenantHandler.get(search);
    res.sendData(result);
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
    const id = req.query.id;
    let result = await tenantHandler.remove(id);
    res.sendData(result);
  });

module.exports = router;