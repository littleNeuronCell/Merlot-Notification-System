var express = require("express");
var app = express();
var server = require("http").createServer(app);
var os = require("os")
var bodyParser = require('body-parser');
var Console = require("node-console-input");

const terminal = require("./terminal.js");


var PORT = 5555;
var HostAddress = os.hostname();
console.log("============ Starting server ============");
PORT = Console.getConsoleInput("Please select a port: \n",true);//Force input
console.log("Waiting for Incoming connections on "+HostAddress+":" + PORT);
console.log("--------------------------------------------------");
server.listen(PORT);
var numRequestsDone = 0;
app.use(express.static(__dirname+ "js"));
app.use(bodyParser.json()); 
app.post("/",function(req,res){
	// console.log("Receiving data");

	console.log("Receiving Request: "+ (++numRequestsDone));
	//console.log(req.body)

	res.json({
		"status":"200",
		"message":"Successly read your data"
	})
	res.end();
});


terminal.AllowInput();