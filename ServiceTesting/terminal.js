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
	  	if(output == false){
	  		console.log(false);
	  	}


	});
/*
	function pullLogs(client_id, timestamp, notificationType, restrict) 
	{
		if(client_id)
		{
			let respond = SearchAll(client_id);
			return respond;
		}
	}
	function SearchAll(log_client_id) 
	{
		let sql= `SELECT id,log_client_id, log_type, log_content, log_timestamp FROM logs WHERE log_client_id=?`;
    	database.get(sql, [log_client_id], (err, row) => {

		  if (err) {
		      	return console.error(err.message);
		      }
		      if(row)
		      {
		      	var jsonResp = '{"log_id":"'+ row.id+'", "log_timestamp":"'+ row.log_timestamp +'", "log_client_id":"'+row.log_client_id + '", "log_type":"'+row.log_type +'","log_content":"'+row.log_content +'"}';
		      	return console.log(jsonResp);
		      }
		      else

		      return console.log(`No logs are found`);
		  });
	}


}
*/