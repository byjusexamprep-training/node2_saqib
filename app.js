const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");
const app = express();
const knex = require("./libraries/db");
const cors = require("cors");

app.use(bodyParser.json());
app.use(cors({ origin: "*" }));

app.use("/", routes);

app.listen(4000, () => {
  console.log("listening at 4000new");
});
