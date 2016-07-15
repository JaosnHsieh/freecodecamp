var express = require('express');
var app = express();
var moment = require('moment');

 app.get('/', function (req, res) {
  res.sendFile(__dirname+'/public/index.html');
  
});
app.get('/:datestring', function(req,res) {
  var myDate;
  if(/^\d{8,}$/.test(req.params.datestring)) {
    myDate = moment(req.params.datestring, "X");
  } else {
    myDate = moment(req.params.datestring, "MMMM D, YYYY");
  }

  if(myDate.isValid()) {
    res.json({
      unix: myDate.format("X"),
      natural: myDate.format("MMMM D, YYYY")
    });
  } else {
    res.json({
      unix: null,
      natural: null
    });
  }


});
app.use('/public',express.static(__dirname+'/public'));

app.listen(process.env.PORT ||8080);

console.log(process.env.PORT ||8080);