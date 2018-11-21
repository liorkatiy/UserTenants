const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors")
const app = express();
const responseHandler = require("./response");
const {
  verifyToken
} = require("./jwt");
const config = require("./config.json"); // config for metadata

const accountRouter = require("./Routers/account");
const tenantRouter = require("./Routers/teants");

//connect to mongo server
mongoose.connect("mongodb://localhost:27017/usertenant");
mongoose.Promise = global.Promise;
mongoose.connection.on("connected", () => console.log("Connected To Database"));

app.use(
  cors({
    origin: config.CORS_Origin,
    credentials: true
  }),
  bodyParser.json(),
  express.static(path.join(__dirname, "/public"), {
    index: false
  }),
  responseHandler
);

app.use("/tenant", verifyToken, tenantRouter); // router for tenants CRUD 
app.use("/account", accountRouter); // router to deal with login/register

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
}); // send the website

const port = process.env.PORT || 9001;
app.listen(port, function () {
  console.log("listening on port: " + port);
});