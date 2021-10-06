// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
// var dateFormat = require('dateformat');
// var time = require("./time.js");
var moment = require("moment")

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


// // your first API endpoint... 
// app.get("/api/hello", function (req, res) {
//   res.json({greeting: 'hello API'});
// });

function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}

app.get("/api", (req, res)=>{
  let date = new Date();
  
  return res.json({
    'unix': date.getTime(), 
    'utc': date.toUTCString()
  });  
});

app.get('/api/:time',function(req,res){
    var data = req.params;
    // console.log(data);
    // res.json(time(data.time));
    var patt = /^[0-9]*$/g;
    var isNum = patt.test(data.time);
    
    if(isNum){
      var tgl = new Date(parseInt(data.time));
        var result = {
            unix: parseInt(data.time),
            utc : tgl.toUTCString()
        }
        res.json(result);
    } else {
        var tgl = new Date(data.time);
        if(moment(data.time,'MMMM DD YYYY').isValid()){   
            var result = {
                unix: parseInt(tgl.getTime()),
                utc:  tgl.toUTCString()
            }
            res.json(result);
        } else {
            res.json({
                error: "Invalid Date"
            })
        }
    }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});