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
app.use(bodyParser.urlencoded({		extended: true		}));


terminal.ConsoleInput();
app.post("/", async function(req,res){
	try{
		
		var data = req.body;

		// console.log(req)
		console.log(data)
		if(valid(data)){
			logs.insert(data.ClientID,data.Type,data.Content.pin);			
			data.ClientID = "u16009917@tuks.co.za";
			var mailFeedback = await Mailer.sendMail(data.ClientID,data.Type,data.Content);
			console.log(mailFeedback);
			//mailFeedback = JSON.parse(mailFeedback);	
			/*Send feedback to the person who requested our service*/
			res.json(mailFeedback);		
			res.end();
		}
		else{
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
		"timestamp": Math.floor(Date.now()),
		"message":message
	}
	return response
}

/* This will convert a file to base 64
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

*/

/*
//return a promise that resolves with a File instance
function urltoFile(url, filename, mimeType){
    mimeType = mimeType || (url.match(/^data:([^;]+);/)||'')[1];
    return (fetch(url)
        .then(function(res){return res.arrayBuffer();})
        .then(function(buf){return new File([buf], filename, {type:mimeType});})
    );
}

//Usage example:
urltoFile('data:image/png;base64,......', 'a.png')
.then(function(file){
    console.log(file);
})
*/