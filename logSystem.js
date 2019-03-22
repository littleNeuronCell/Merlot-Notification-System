const fs = require('fs'); // creation of file system obj
const totalLogs = 10; // how much logs is allowed, might be bigger ammount





function response(status,message){
    var response = {
        "status" : status,
        "timestamp": new Date(),
        "message":message
    }
    return response
}
exports.temp= function(){
    return "hi";
}

exports.logSystem = function (jsonObj) {

    let jsObj = JSON.parse(jsonObj);   // after receiving json object parse it to retrieve valuable info to work with
    
    if(jsObj.content == undefined)
        return response("failed","missing arguement 'content'");
    if(jsObj.type == undefined)
        return response("failed","missing arguement 'type'");
    if(jsObj.client_id == undefined)
        return response("failed","missing arguement 'client_id'");

    let fileName = "notificationLogs.txt"; // file name, may be changed
    let client = jsObj.client_id; // retrieving client id 
    let type = jsObj.type; // type of notification
    let content = jsObj.content; // content of notification
    var enteries = 0; // this var will hold num of entries
    

    fs.stat(fileName, function(err, stats) { // if file does not exist
        if (err){
            return insertLog(client,type,content, fileName, fs, 1); // if error is thrown we will going to call
            //insertClient that will create and add 
            //new entery to the file
        }
        else if (stats.isFile()) { // if file exists
           let reader = fs.createReadStream(fileName);
            // we going to read the file to get number of enteries. Make it as separate function
               //does not work, because everything is assynchronouse 
           reader.on('error',  err => { 
               return err; // if failed to read will return error
           });
           reader.on('data', function(chunk){ // read character by character
                for(j = 0; j < chunk.length; j++)
                {
                    if(chunk[j] == 10) // if row hit new line symbol. 10 represents new line
                    {
                        enteries++; // increase number of entries

                    }
                }
            }).on('end', function(){
                enteries++;
                return insertLog(client,type,content, fileName, fs, enteries); // in the end of reading we will insert new entry

            });


        }
    });

    return response("success","logged success");
};




//Responsible for inserting logs
function insertLog(client,type,content, fileName,fs, number) {

   //console.log("this is numbers: "+ number);
   var data = number+" "+client + " [" + new Date() + "] " + type + " " + content + "\n";
    var buffer = new Buffer.from(data);
    fs.open(fileName, 'a+', function (err, fd) {
        if (err) {
            throw "could not open log file";
        }
        fs.write(fd, buffer, 0, buffer.length, null, function (err) {
            if(err) throw 'error writing to log file: ' + err;
                fs.close(fd, function () {
                    // console.log('wrote to file successfully');
                    
                    //This is a dummy function, we will pass the name of the reporting function that is responsible for receiving logs
                    var funcName = function(jsObj) {
                        var resp;
                        //console.log(typeof jsObj);
                        if((typeof jsObj) === "object")
                        {
                             resp = '{"status":"Success",' +
                                 '"timestamp": '+ '"'+new Date()+'", ' +
                                 '"message": "some info"}';
                        }
                        else
                        {
                            resp = '{"status":"Failure",' +
                                '"timestamp": "'+new Date()+'", ' +
                                '"message": "some info"}';
                        }
                        return resp;
                    };

                    // if number of entries exceeds number of allowed logs
                    if(number > totalLogs)
                    {
                       var status = pushToReporting(fileName, number, fs, funcName)
                       if(status) // we going to try and push it to reporting
                        {
                            fs.writeFile(fileName, "", function(){console.log('logs are sent to reporting and log file is cleaned')}); 
                            return {"status":"success","message":"cleared file"};   
                        }
                        return {"status":"failed","message":"failed to push to reporting"};
                    }

                        return {"status":"success","message":"entry logged"};
                });
        });
    });
}

    //This function responsible for pushing to reporting
    /*
    * fileName - name of log file
    * ent - number of entries
    * fs - file system object
    * funcName - name of reporting function to where we will sent our file content
    */
async function pushToReporting(fileName, ent, fs, funcName) {
    let reader = fs.createReadStream(fileName);
    let spaceNum = 0;
    let space = 32;
    let newLine = 10;
    let openBr = 91;
    let closeBr = 93;
    let arr = [];
    reader.on('error',  err => {
        throw "Error: "+ err;
    });
    reader.on('data', function(chunk){
        for(let j = 0, i = 0; j < ent && i < chunk.length; j++)
        {
            let str = "";
            while(chunk[i] !== newLine)
            {
               str += String.fromCharCode(chunk[i]);
                i++;
            } // the following process retrieves info from every line in log file. Change to javascript object
            var obj = null;
            var timestamp = str.substring(str.indexOf("["), str.indexOf("]"));
            timestamp = timestamp.replace("[","");
            str = str.replace(timestamp, "");
            str = str.replace(" []", "");
            var num = str.substring(0, str.indexOf(" "));
            str = str.replace(num+" ", "");
            var client = str.substring(0, str.indexOf(" "));
            str = str.replace(client+" ", "");
            var type = str.substring(0, str.indexOf(" "));
            str = str.replace(type+" ", "");
            var content = str.substring();
            str = str.replace(content, "");
            obj = {client_id: client,timestamp : timestamp, type: type, content: content};
            arr[j] = obj; // push to array of js objects
            i++;
        }

    }).on('end', function(){
        if(JSON.parse(funcName(arr)).status === "Success") 
        {// if we will receive success from reporting subsystem we will return true to the main function in this module
            // console.log(arr);      
            // console.log("Success");
            return true;
        }
        else{
            // console.log("Fail");
            return false;
        }


    });
}

exports.pushTest = function (fileName, ent, fs){
    //This is a dummy function, we will pass the name of the reporting function that is responsible for receiving logs
    var funcName = function(jsObj) {
        var resp;
        //console.log(typeof jsObj);
        if((typeof jsObj) === "object")
        {
             resp = '{"status":"Success",' +
                 '"timestamp": '+ '"'+new Date()+'", ' +
                 '"message": "some info"}';
        }
        else
        {
            resp = '{"status":"Failure",' +
                '"timestamp": "'+new Date()+'", ' +
                '"message": "some info"}';
        }
        return resp;
    };

    var res = pushToReporting(fileName, ent, fs, funcName); 
    console.log("logSystem: "+res);
    return res;  
}


