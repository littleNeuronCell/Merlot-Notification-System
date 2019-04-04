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

//Assertion error fix
//Addtion function test for database backup
   it('Attempting log with empty JSON ',function(){
      var res=log.logSystem('{}');
      expect(res.status).to.equal("failed")
      expect(res.message).to.equal("empty Object");
    }

    it('should check for Invalid Json type',function(){
        var res=log.logSystem({"content":"1234", "type":"OTP"});
        expect(res.status).to.equal("failed");
        expect(res.message).to.equal("Invalid type object");
    })

