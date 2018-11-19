const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const responseHandler = require("./response");
const {
  verifyToken
} = require("./jwt");

const accountRouter = require("./Routers/account");
const tenantRouter = require("./Routers/teants");

mongoose.connect("mongodb://localhost:27017/usertenant");
mongoose.Promise = global.Promise;
mongoose.connection.on("connected", () => console.log("Connected To Database"));

app.use(
  bodyParser.json(),
  express.static(path.join(__dirname, "/public"), {
    index: false
  }),
  responseHandler
);

app.use("/tenant", verifyToken, tenantRouter);
app.use("/account", accountRouter);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

const port = process.env.PORT || 9001;
app.listen(port, function () {
  console.log("listening on port: " + port);
});