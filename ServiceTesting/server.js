var express = require("express");
var app = express();
var server = require("http").createServer(app);
var Console = require("node-console-input");
var http = require("http");
var AsyncPolling = require('async-polling');
var url = require("url");
var os = require("os")
var stringMath = require("string-math");

var bodyParser = require('body-parser');

const terminal = require("./terminal.js");



var PORT = 5555;
var HostAddress = os.hostname();
console.log("============ Starting server ============");
PORT = Console.getConsoleInput("Please select a port: \n",true);//Force input
console.log("Waiting for Incoming connections on "+HostAddress+":" + PORT);
console.log("--------------------------------------------------");
server.listen(PORT);
app.use(express.static(__dirname+ "js"));
app.use(bodyParser.json()); // for parsing application/json
// app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.post("/",function(req,res){
	console.log("Receiving data");


	console.log(req.body)
	// res.end("OK")
	//res.writeHead(200, {'Content-Type': 'application/json'});
	res.json({
		"status":"200",
		"message":"Successly read your data"

	})
	res.end()
});
