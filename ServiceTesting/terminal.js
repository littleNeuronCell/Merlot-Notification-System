/**
* @param io: Socket 
* @param connection: A 1D array containing on the sockets connected to the server
*/
exports.AllowInput= function(io,connections){
	//Allow the terminal to multitask by creating another process decicated to listening for commands
	var stdin = process.openStdin();
	if(connections == null)
		console.log("Conntections are null")
	stdin.addListener("data", function(d) {
	  	var commands = d.toString().trim();
	  	commands = commands.split(" ");
	  	if(commands.length == 1)
	  		output= command(commands[0],"",io,connections)
	  	else
	  		output = command(commands[0],commands[1],io,connections);
	  	if(output == false){
	  		console.log(false);
	  	}
	});

//Specify what commands can be used
function command(cmd, id="",io,connections){
	var socket = io.sockets;
	switch(cmd){
		case "1":
		case "kill":{
			//close the id
			if(id==""){
				console.log("Incorrect use of the command 'kill', please specify an ID aswell");
				break;
			}

			try{
				if(socket.sockets[connections[id-1].id]){
					socket.sockets[connections[id-1].id].disconnect();
					connections.remove(id-1);
					return;
				}
			}
			catch(error){
				console.log("Please Select A valid id between 0 AND "+connections.length-1);
			}
			break;
		}
		case "3":
		case "restart":{
			console.log("Restarting All connections");
			io.close();
			break;
		}
		case "4":
		case "exit":{
			console.log("============ Closing All connections ============");
			io.close();
			stdin.removeAllListeners('data');
			console.log("============ Stopping Server ============");
			process.exit();
			break;
		}
		case "2":
		case "list":{
			console.log("============ Connections ============");
			for (var i = 0; i < connections.length; i++) {
				var user = connections[i].username
				if(user == undefined)
					user = "Unknown";
				console.log("Connection "+(i+1)+"'s IP: "+connections[i].id +" ,Since: "+user);
			}
			console.log("");
			break;
		}
		default:{
			console.log("============ Commands ============");
			console.log("1) kill <id>");
			console.log("2) list");
			console.log("3) restart");
			console.log("4) exit");
			console.log("");
		}
	}
}
}