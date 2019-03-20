var fs = require("fs");
function insert(client,type,content){
    var timestamps=+new Date();
    return "[ "+client +" ]"+" ["+timestamps+"] "+"["+type+"] " + "["+content+"] \n";
}
var data=insert("Musa Mathe","OTP","The content");
fs.appendFile("temp.txt", data, function(err, data) {
  if (err) console.log(err);
  console.log("Successfully Written to File.");
});
