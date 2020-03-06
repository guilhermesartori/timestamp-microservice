var express = require("express");
var cors = require("cors");
require("dotenv").config();

var app = express();
app.use(cors({ optionSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// API endpoint
app.get("/api/timestamp/:date_string?", function(req, res) {
  let dateParse = Date.parse(req.params.date_string);
  let date = undefined;

  if (req.params.date_string === undefined) {
    date = new Date();
  } else if (isNaN(dateParse)) {
    let unixDate = parseInt(req.params.date_string);
    if (isNaN(unixDate)) return res.json({ error: "Invalid Date" });
    else date = new Date(parseInt(req.params.date_string));
  } else {
    date = new Date(req.params.date_string);
  }
  return res.json({ unix: date.getTime(), utc: date.toUTCString() });
});

// listen for requests
var listener = app.listen(process.env.PORT, function() {
  console.log(
    "Your app is listening on port " + listener.address().port + "..."
  );
});
