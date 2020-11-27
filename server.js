// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/timestamp/:date", function (req, res) { console.log(req.params.date);
  if (req.params.date.indexOf('-') < 0 && req.params.date.indexOf(' ') < 0) {
     const unixDate = Number(req.params.date);
     const date = new Date(unixDate).toUTCString();
     res.json({"unix": unixDate, "utc": date});
  } else {
    const formattedDate = new Date(req.params.date);
    if (formattedDate == "Invalid Date") {
      res.json({ error : "Invalid Date" });
    }
  
    const epochTimestamp = formattedDate.getTime();
    res.json({"unix": epochTimestamp, "utc": formattedDate.toUTCString() });
    }
  });

app.get("/api/timestamp/", function (req, res) {
    const currentDate = new Date();
    res.json({
    "unix": currentDate.getTime(), "utc": currentDate.toUTCString()
    })

});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
