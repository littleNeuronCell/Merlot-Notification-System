exports.AllowInput= function(){
	//Allow the terminal to multitask by creating another process decicated to listening for commands
	var stdin = process.openStdin();
	stdin.addListener("data", function(d) {
	  	var commands = d.toString().trim();
	  	commands = commands.split(" ");
	  	if(commands.length == 1)
	  		output= command(commands)
	  	else
	  		output = command(commands);
	  	if(output == false){
	  		console.log(false);
	  	}
	});

function command(command){
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
}
}