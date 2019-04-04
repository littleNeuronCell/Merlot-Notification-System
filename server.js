var express = require("express");
var app = express();
var server = require("http").createServer(app);
var os = require("os");
var Console = require("node-console-input");
var bodyParser = require('body-parser');
var Console = require("node-console-input");
var rp = require('request-promise');

var Mailer = require("./SendMail.js");
var logs = require("./logSystem.js");

const PORT = process.env.PORT || 5000;

var HostAddress = os.hostname();
console.log("============ Starting server ============");
// PORT = Console.getConsoleInput("Pleaseselect a port: \n",true);//Force input
console.log("Waiting for Incoming connections on "+HostAddress+":" + PORT);
console.log("--------------------------------------------------");

server.listen(PORT);

app.use(express.static(__dirname+ "js"));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({		extended: true		}));

app.get("/",function(req,res){
	res.sendFile( __dirname + "/client/index.html");
});


app.post("/", async function(req,res){
	try{
		
		var data = req.body;
		if(valid(data)){
			logs.logSystem('{"client_id":"'+data.ClientID+'", "type":"'+data.Type+'", "content":"'+data.Content.pin+'"}');
			
			var clientdata = '';
			// console.log(data.ClientID);
			if (data.ClientID.includes('@')){
				clientdata = {
					'email': data.ClientID,
					'name' : 'Valued',
					'surname' : 'Customer'
				}
				// console.log("if statement")
			}else clientdata = await getMail(data.ClientID);
			
			// console.log(clientdata);
			var mailFeedback = await Mailer.sendMail(clientdata,data.Type,data.Content);	
			res.json(mailFeedback);		
			res.end();
		}
		else
		{
			res.json(response("failed","Invalid Notification Type or Missing arguements"))
		}
	}catch(error){
		console.log(error);
	}
});


function valid(data){
	if(data.Type == "OTP")
	{
		if (data.ClientID != undefined && data.Content != undefined) 
			return true;
		else
			return false;
	}
	else if (data.Type == "generic")
	{
		if (data.ClientID != undefined && data.Content != undefined) 
			return true;
		else
			return false;
	}
	else if (data.Type == "card")
	{
		if (data.ClientID != undefined && data.Content != undefined) 
			return true;
		else
			return false;
	}
}

function response(status,message){
	var response = {
		"status" : status,
		"timestamp": new Date(),
		"message":message
	}
	return response
}

async function getMail(ClientID){

	var data = {
	  "option": "getEmail",
	  "clientId": ClientID
	};
	var options = {
	    method: 'POST',
	    uri: 'https://merlotcisg7.herokuapp.com/',
	    body: data,
	    json: true // Automatically stringifies the body to JSON
	};
	 
	return await rp(options)
	    .then(function (parsedBody) {
	        // console.log("l134: "+ parsedBody)
	        return parsedBody;
	    })
	    .catch(function (err) {
	        console.log(err);
	    });
}
