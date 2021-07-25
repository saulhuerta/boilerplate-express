var express     = require('express');
var bodyParser  = require('body-parser');
var app = express();

require('dotenv').config();


//Mount the express.static() middleware  to the path /public with app.use(). 
app.use( "/public/", express.static( __dirname + "/public/"));

app.use( bodyParser.urlencoded({extended: false}) );

app.use( "/", function(req, res, next){

    console.log(req.method + " " + req.path + " - " + req.ip);
    next();

});


app.get( "/now", function(req, res, next){

    req.time = new Date().toString();
    next();

},
    function(req, res) {

        res.send({"time": req.time});

    }
);

app.get( "/:word/echo", (req, res) => {

    res.json({
        echo: req.params.word
    });

});
  

app.route( "/name" )
.get( (req, res) => {

    res.json({
        name: req.query.first + ' ' + req.query.last
    });

})
.post( (req, res) => {

    res.json({
        name: req.body.first + ' ' + req.body.last
    });

});

app.get( "/json", (req, res) => {

    const   mySecret = process.env['MESSAGE_STYLE'];
    var     response = "Hello json";
  
    console.log(mySecret)
  
    if(mySecret === "uppercase"){
        response = "Hello json".toUpperCase();
    }

    res.json({
        message: response
    });

});
    

  
//Use the app.get() method to serve all GET requests matching the / (root) path.
app.get( "/", function (req, res) {
    
    //res.send('Hello Express')   //Send 'Hello Express'

    //Send a html file
     res.sendFile ( __dirname + "/views/index.html"); 

});

















 module.exports = app;
