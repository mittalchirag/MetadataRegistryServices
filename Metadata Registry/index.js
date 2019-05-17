var express = require("express");
var morgan = require("morgan");
var bodyParser = require("body-parser");
var router = express.Router();
var app = express();
var appRoutes = require("./app/routes/api")(router);
var path = require("path");

app.use(morgan("dev"));
app.use(bodyParser.json()); // for parsing application/json

app.use(
  bodyParser.urlencoded({
    extended: true
  })
); // for parsing application/x-www-form-urlencoded

app.use(express.static(__dirname + "/public")); // GET /front-end
app.use("/api", appRoutes); //serve the API
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html')); //index.html serve
});

app.listen(8080, function () {
    console.log('Listening on port 8080');
});

module.exports = app;