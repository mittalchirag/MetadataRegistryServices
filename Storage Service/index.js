var express = require("express");
var morgan = require("morgan");
var bodyParser = require("body-parser");
var cors = require('cors');
var path = require('path');
var router = express.Router();
var app = express();
var appRoutes = require("./app/routes/api")(router);
var port = process.env.PORT || 3032;
var mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/MDR', {useNewUrlParser: true}, function (err) {
  if (err) {
    console.log('Not connected to MDR DB: ' + err);
  } else {
    console.log('Successfully connected to MDR DB');
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
app.use('/file', express.static(path.join(__dirname, '/file')));

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