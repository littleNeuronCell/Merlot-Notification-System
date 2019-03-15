const sqlite3 = require('sqlite3').verbose();
let database = new sqlite3.Database('db/logs.db', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
  });

exports.insert = function(client, type, content){
   	database.run(`INSERT INTO logs(log_client_id,log_type,log_content) VALUES(?,?,?)`, [client, type, content], function(err) {
		if (err) {
       		return console.log(err.message);
    	}
 	});
}
exports.searchALL= function(){
	let sql= "SELECT log_id,log_client_id, log_type, log_content, log_timestamp FROM logs";
    database.all(sql, [], (err, rows) => {

	  	if (err) 		{
	     	return "ERROR";
    	}
	  	rows.forEach((row) =>{
      	 	var jsonResp = '{"log_id":"'+ row.log_id+'", "log_timestamp":"'+ row.log_timestamp +'", "log_client_id":"'+row.log_client_id + '", "log_type":"'+row.log_type +'","log_content":"'+row.log_content +'"}';
	    	console.log(jsonResp);
		})
      	return "No logs found"	

	})
    	// return "Fail to fetch";
		 
		  
}


exports.pullLogs = function(client_id, timestamp, notificationType, restrict){
		// return pull(client_id, timestamp, notificationType, restrict);
		// return "sdfsdfsd";
		function pull(client_id, timestamp, notificationType, restrict) 
		{

			if(client_id)
			{
				let respond = Search(client_id);
				return respond;
			}
		}


		function Search(log_client_id) 
		{
			let sql= `SELECT log_id,log_client_id, log_type, log_content, log_timestamp FROM logs WHERE log_client_id=?`;
	    	database.get(sql, [log_client_id], (err, row) => {

			  if (err) {
			      	return "ERROR";
			      }
			      if(row)
			      {
			      	var jsonResp = '{"log_id":"'+ row.id+'", "log_timestamp":"'+ row.log_timestamp +'", "log_client_id":"'+row.log_client_id + '", "log_type":"'+row.log_type +'","log_content":"'+row.log_content +'"}';
			      	return jsonResp;
			      	// return "sdfsdf";
			      }
			      else
			      	return "No logs are found";
			  });
		}
}

