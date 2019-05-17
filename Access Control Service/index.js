var express = require("express");
var morgan = require("morgan");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var cors = require('cors');

var router = express.Router();
var app = express();
var appRoutes = require("./app/routes/api")(router);
var path = require("path");
var port = process.env.PORT || 3030;

mongoose.connect('mongodb://localhost:27017/ACL', {useNewUrlParser: true}, function (err) {
  if (err) {
    console.log('Not connected to ACL DB: ' + err);
  } else {
    console.log('Successfully connected to ACL DB');
  }
});

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json()); // for parsing application/json

app.use(
  bodyParser.urlencoded({
    extended: true
  })
); // for parsing application/x-www-form-urlencoded


app.use("/api", appRoutes); //serve the API
app.get('*', function (req, res) {
  res.json({
    success: false,
    message: "Couldn't find the API URI"
  });
});

app.listen(port, function () {
  console.log('Listening on port ' + port);
});

module.exports = app;