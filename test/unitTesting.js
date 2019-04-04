var expect = require('chai').expect;
var fs = require("fs");
var log = require("../logSystem.js");
//var request = require("request");
var XMLHttpRequest= require("xmlhttprequest").XMLRequest;

describe('Database Testing', function () {
 	it('should create an entry to the notificationLogs.txt', function () {
 		var res = log.logSystem('{"client_id":"12121", "type":"OTP", "content":"1234"}');
    	expect(res.status).to.equal("success")
    });
    it('Attempting log without paramater Content: failed', function () {
 		var res = log.logSystem('{"client_id":"12121", "type":"OTP"}');
    	expect(res.status).to.equal("failed")
    	expect(res.message).to.equal("missing arguement 'content'");

    });
    it('Attempting log without paramater type: failed', function () {
 		var res = log.logSystem('{"client_id":"12121","content":"1234"}');
    	expect(res.status).to.equal("failed")
    	expect(res.message).to.equal("missing arguement 'type'");

    });
    it('Attempting log without paramater client_id: failed', function () {
 		var res = log.logSystem('{"content":"1234", "type":"OTP"}');
    	expect(res.status).to.equal("failed")
    	expect(res.message).to.equal("missing arguement 'client_id'");

    });
	
	it('Attempting log with empty JSON object', function () {
 		var res = log.logSystem();
    	expect(res.status).to.equal("failed")
    	expect(res.message).to.equal("Empty JSON object");
    });

    it('Attempting log with many arguments', function () {
    var res = log.logSystem('{"client_id":"12121","content":"staff", "type":"OTP","status":"checking","color":"blue"}');
      expect(res.status).to.equal("failed")
      expect(res.message).to.equal("Many arguments passed");
    });

    it('Attempting log with Invalid JSON type', function () {
   var res = log.logSystem(232323);
     expect(res.status).to.equal("failed")
     expect(res.message).to.equal("Invalid JSON type");
   });
	
});

/*
describe('Push testing',function(){
	it("Push data to Reporting",function(){
		var res = log.pushTest("notificationLogs.txt",21,fs);
		console.log(res);
   		expect(res).to.equal(true);

	}); 	
})
*/

//not working
describe('Send email testing',function(){
	it("Attempting to send email to an invalid user",function(){
		var res = mail.sendMail("hasgah","OTP","Testing content");
		//console.log(res);
   		expect(res).to.equal("failed");

	}); 	
	
	it("Attempting to send email with invalid type",function(){
		var res = mail.sendMail("u13286383@tuks.co.za",1,"Testing content");
		//console.log(res);
   		expect(res).to.equal("Fatal error");

	});
	
	it("Attempting to send email with invalid content",function(){
		var res = mail.sendMail("u13286383@tuks.co.za","OTP");
		//console.log(res);
   		expect(res).to.equal("Fatal error");

	});
})


var url = "http://127.0.0.1:5000";
var OTP = {
    "ClientID": "23432",
    "Type": "OTP",
    "Content": {
        "pin": "123456"
    }
}


describe('API testing',function(){

it("Sending an OTP notification",function(done){
  this.timeout(5000);
  let promise = new Promise(async(resolve,reject)=> {
      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
        resolve(this.responseText);
      }
    });
    send(xhr,OTP);
  })

  promise.then((successMessage)=>{
    // console.log("yay "+successMessage);
    var res = JSON.parse(successMessage)

      //it("Sending an OTP notification",function(){
        expect(res.status).to.equal("success");
        done();
  },5000)
    
})
    
})
/*
describe('pushToReporting', function(){
	it("Pushing data to reporting", function(){
	
})

describe('Push testing',function(){
	it("Push data to Reporting",function(){
		var res = log.pushTest("notificationLogs.txt",21,fs);
		console.log(res);
   		expect(res).to.equal(true);

	}); 	
})
*/
function send(xhr,notify){
    xhr.open("POST", "http://127.0.0.1:5000");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.send(JSON.stringify(notify));
}


function pausecomp(millis)
{
    var date = new Date();
    var curDate = null;
    do { curDate = new Date(); }
    while(curDate-date < millis);
}

async function makeRequest(jsonObj){

var options = { method: 'POST',
  url: 'http://127.0.0.1:5555',
  headers: 
   { 'Postman-Token': 'fe00621e-2cbe-4120-83c5-1b340d0b541e',
     'cache-control': 'no-cache',
     'Content-Type': 'application/json' },
  body: JSON.stringify(jsonObj)
};




request(options,async  function (error, response, body) {
 	var res = await body
 	console.log(body)
  	return res;
})

}




