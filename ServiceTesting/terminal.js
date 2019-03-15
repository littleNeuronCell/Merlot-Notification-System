/*This version should support input from terminal*/
// and it accomplish this by including the logs js
// const sqlite3 = require('sqlite3').verbose();
// let database = new sqlite3.Database('db/logs.db', (err) => {
//     if (err) {
//       return console.error(err.message);
//     }
//     console.log('Connected to the in-memory SQlite database.');
//   });

var logs = require("./logs")	

exports.ConsoleInput = function(){
	//Allow the terminal to multitask by creating another process decicated to listening for commands
	var stdin = process.openStdin();

	stdin.addListener("data", function(d) {
	  	var commands = d.toString().trim();
	  	commands = commands.split(" ");
	  	if(commands.length == 1 && commands[0] != 'exit')
	  	{
	  		client_id = commands[0];
	  		timestamp = null;
	  		notificationType = null;
	  		restrict = "all";
	  		output= logs.pullLogs(client_id, timestamp, notificationType, restrict);
	  	}
	  	else if(commands[0] == 'exit')
	  	{
	  		console.log("============ Stopping Server ============");
			process.exit();
	  	}
	  	else
	  	{
			client_id = commands[0];
	  		timestamp = commands[1];
	  		notificationType = commands[2];
	  		restrict = commands[3];
	  		output = pullLogs(client_id, timestamp, notificationType, restrict);
	  	}

	var cmd = command[0];
	switch(cmd){
		case "1":
		case "exit":{
			stdin.removeAllListeners('data');
			console.log("============ Stopping Server ============");
			process.exit();
			break;
		}
		
		default:{
			console.log("============ Commands ============");
			console.log("1) exit");
			console.log("");


		}
	}		
});
