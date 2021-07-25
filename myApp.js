var express = require('express');
var app = express();

require('dotenv').config();

app.use("/", function(req, res, next){
    console.log(req.method + " " + req.path + " - " + req.ip);
    next();
});
  

//Mount the express.static() middleware  to the path /public with app.use(). 
app.use("/public/", express.static( __dirname + "/public/"));

app.get("/:word/echo", (req, res) => {
    
    res.json({
      echo: req.params.word
    });

  });
  

app.get("/now", (req, res, next) => {
    
    req.time = new Date().toString();
    next();

  }, function(req, res){
    
    var time = new Date().toString();
    res.json({
      time: time
    });
    
});
  

app.route("/name")
.get( (req, res) => {
    res.json({
        name: req.query.first + ' ' + req.query.last
    });
})
.post( (req, res) => {
    res.json({
        name: req.query.first + ' ' + req.query.last
    });
});

app.get("/json", (req, res) => {

    var response = "Hello json";

    console.log(process.env.MESSAGE_STYLE + "");
    console.log(response);

    if(process.env.MESSAGE_STYLE === "uppercase"){
        response = "Hello json".toUpperCase();
    }else{
        response = "Hello json";
    }

    console.log(response);

    res.json({
      message: response
    });
  });

  
//Use the app.get() method to serve all GET requests matching the / (root) path.
app.get('/', function (req, res) {
    
    //res.send('Hello Express')   //Send 'Hello Express'

    //Send a html file
     res.sendFile ( __dirname + "/views/index.html"); 

});


































 module.exports = app;
