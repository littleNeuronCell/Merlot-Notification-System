exports.logSystem = function (jsonObj) {

    let jsObj = JSON.parse(jsonObj);
    let fileName = "notificationLogs.txt";
    let client = jsObj.client_id;
    const fs = require('fs');
    let type = jsObj.type;
    let content = jsObj.content;
    var enteries = 0;
    var totalLogs = 20;
    fs.stat(fileName, function(err, stats) {
        if (err){
            insertLog(client,type,content, fileName, fs, 1);
        }
        else if (stats.isFile()) {
           let reader = fs.createReadStream(fileName);
           reader.on('error',  err => {
               return err;
           });
           reader.on('data', function(chunk){
                for(j = 0; j < chunk.length; j++)
                {
                    if(chunk[j] == 10) // if row hit new line symbol. 10 represents new line
                    {
                        enteries++;

                    }
                }
            }).on('end', function(){
                enteries++;
                insertLog(client,type,content, fileName, fs, enteries);

            });


        }

    });


    function insertLog(client,type,content, fileName,fs, number) {

       console.log("this is numbers: "+ number);
       var data = number+" "+client + " [" + new Date() + "] " + type + " " + content + "\n";
        var buffer = new Buffer.from(data);
        fs.open(fileName, 'a+', function (err, fd) {
            if (err) {
                throw "could not open log file";
            }
                fs.write(fd, buffer, 0, buffer.length, null, function (err) {
                    if(err) throw 'error writing to log file: ' + err;
                        fs.close(fd, function () {
                            console.log('wrote to file successfully');
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
                            if(number >= totalLogs)
                            {
                                if(pushToReporting(fileName, enteries, fs, funcName))
                                {
                                    console.log("should be here");
                                    fs.truncate(fileName, 0, function(){console.log('logs are sent to reporting and log file is cleaned')});
                                }
                            }
                        });
            });
        });
    }

    function pushToReporting(fileName, ent, fs, funcName) {
        //funcName({hey: "hey"});
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
                }
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
                obj = {number: num,client_id: client,timestamp : timestamp, type: type, content: content};
                arr[j] = obj;
                i++;
            }

        }).on('end', function(){
            if(JSON.parse(funcName(arr)).status === "Success")
            {
                console.log("Success");
                return true;
            }
            else{
                console.log("Fail");
                return false;
            }


        });
    }

};