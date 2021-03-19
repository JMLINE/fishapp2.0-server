require("dotenv").config();
var express = require("express");
var app = express();
//var authTest = require("./controllers/authtestcontroller.js")
// var test = require("./controllers/testcontroller");
var sequelize = require("./db");
var bodyParser = require("body-parser");

var user = require("./controllers/usercontroller");
var fish =require("./controllers/logcontroller")

sequelize.sync();
app.use(bodyParser.json());


//test endpoint--before auth key
// app.get("/api/about-me2", function (req, res){
//   res.send('hey hey hey hey')
// })
app.use(require('./middleware/header')) 

app.use("/api/user", user);
//app.use("/test-controller", test);
app.use(require('./middleware/validate-session'))



//app.use("/api/authtest", authTest);


// app.get('/', function(request, response){
// response.send("Hello World")
// })

// app.use('/api/test', function(req,res){

// res.send("This is data from the api/test endpoint")
// })

///////changed from log

app.use("/api", fish)
//app.use('/test', test)

app.listen(process.env.PORT, function() {
  console.log(`app is listening on ${process.env.PORT} and hello world`);
});