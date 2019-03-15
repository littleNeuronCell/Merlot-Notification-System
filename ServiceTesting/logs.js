const sqlite3 = require('sqlite3').verbose();
let database = new sqlite3.Database('db/logs.db', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
  });

exports.insert = function(client, type, content){
   	db.run(`INSERT INTO logs(log_client_id,log_type,log_content) VALUES(?,?,?)`, [client, type, content], function(err) {
		if (err) {
       		return console.log(err.message);
    	}
 	});
}

exports.pullLogs = function(client_id, timestamp, notificationType, restrict){
//	console.log("hey");
		pull(client_id, timestamp, notificationType, restrict);
		
		function pull(client_id, timestamp, notificationType, restrict) 
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

db.close();