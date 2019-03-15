/*This version should support input from terminal*/
// and it accomplish this by including the logs js
// const sqlite3 = require('sqlite3').verbose();
// let database = new sqlite3.Database('db/logs.db', (err) => {
//     if (err) {
//       return console.error(err.message);
//     }
//     console.log('Connected to the in-memory SQlite database.');
//   });

var logs = require("./logs");	

exports.ConsoleInput = function(){
	//Allow the terminal to multitask by creating another process decicated to listening for commands
	var stdin = process.openStdin();

	stdin.addListener("data", function(d) {
	  	var commands = d.toString().trim();
	  	commands = commands.split(" ");
	  	switch(commands[0]){
	  		case "1":
	  		case "exit":{
				console.log("============ Stopping Server ============");
				process.exit();
	  			break;
	  		}
	  		case "2":
	  		case "view":{
		  	// 	if(commands.length == 1)
		  	// 	{
		  			console.log(logs.searchALL());
		  	// 	}
		  	// 	else
		  	// 	{
					// client_id = commands[0];
		  	// 		timestamp = commands[1];
		  	// 		notificationType = commands[2];
		  	// 		restrict = commands[3];
		  	// 		output = logs.pullLogs(client_id, timestamp, notificationType, restrict);
		  	// 		console.log(output);
		  	// 	}
	  			break;
	  		}
	  		case "3":
	  		case "insert":{
	  			if(commands.length == 4)
	  				logs.insert(commands[1],commands[2],commands[3])
	  			else{
	  				console.log("Insert <client_id> <type> <content>");
	  			}
	  			break;
	  		}
	  		default:{
				console.log("============ Commands ============");
				console.log("1) exit");
				console.log("2) View Logs");
				console.log("3) Insert <client_id> <type> <content>");
			}			

	  	}		

	});
}