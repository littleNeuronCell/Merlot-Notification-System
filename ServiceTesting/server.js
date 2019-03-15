var express = require("express");
var app = express();
var server = require("http").createServer(app);
var os = require("os");
var Console = require("node-console-input");
var bodyParser = require('body-parser');
var Console = require("node-console-input");



var Mailer = require("./SendMail.js");
var logs = require("./logs");
var terminal = require("./terminal.js");


var PORT = 5555;
var HostAddress = os.hostname();
console.log("============ Starting server ============");
PORT = Console.getConsoleInput("Please select a port: \n",true);//Force input
console.log("Waiting for Incoming connections on "+HostAddress+":" + PORT);
console.log("--------------------------------------------------");

server.listen(PORT);
app.use(express.static(__dirname+ "js"));
app.use(bodyParser.json()); 
terminal.ConsoleInput();
app.post("/",async function(req,res){
	try{

		var data = req.body;
		logs.insert(data.ClientID,data.Type,data.Content.pin);			
		data.ClientID = "u16009917@tuks.co.za";
		var mailFeedback = await Mailer.sendMail(data.ClientID,data.Type,data.Content);
		console.log(mailFeedback);
		mailFeedback = JSON.parse(mailFeedback);	
		/*Send feedback to the person who requested our service*/
		res.json(mailFeedback);		
		res.end();
	}catch(error){
		console.log(error);
	}
});