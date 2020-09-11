var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var limiter = require("./utils/request-limiter");
require("dotenv").config();
const PORT = 8001;

app.use(bodyParser.json());
app.use(limiter);
app.set("etag", false);

require("./routes")(app);
app.listen(PORT);

console.log(`Server Ready at port ${PORT}.`);
