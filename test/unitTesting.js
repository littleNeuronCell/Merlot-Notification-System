var expect = require('chai').expect;
var fs = require("fs");
var log = require("../logSystem.js");
//var request = require("request");
var XMLHttpRequest= require("xmlhttprequest").XMLHttpRequest;
var mail = require("../SendMail.js");

describe('Database Testing', function () {
 	it('should create an entry to the notificationLogs.txt', function () {
 		var res = log.logSystem('{"client_id":"12121", "type":"OTP", "content":"1234"}');
    // console.log(res.message);
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

    /*it('Attempting log with Invalid JSON type', function () {
   var res = log.logSystem(232323);
     expect(res.status).to.equal("failed")
     expect(res.message).to.equal("Invalid JSON type");
   });*/
	
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

describe('Send email testing',function(){
	it("Attempting to send email to an invalid user", async function(){
		var res = await mail.sendMail( {
          'email': "sdfdsf",
          'name' : 'Valued',
          'surname' : 'Customer'
        },"OTP","Testing content");
		//console.log(res.status);
   		expect(res.status).to.equal("failed");

	}); 	
	
    var clientdata = {
          'email': "u13286383@tuks.co.za",
          'name' : 'Valued',
          'surname' : 'Customer'
        }
	it("Attempting to send email with invalid type", async function(){

		var res = await mail.sendMail(clientdata,1,"Testing content");
   		expect(res.status).to.equal("Fatal error");

	});
	
	it("Attempting to send email with invalid content", async function(){
		var res = await mail.sendMail(clientdata,"OTP");
		//console.log(res.status);
   		expect(res.status).to.equal("failed");

	});
	
	it("Attempting to send email with extra parameters", async function(){
		let promise = new Promise(async(resolve,reject)=>{
			resolve(await mail.sendMail(clientdata,"OTP","hi", "testing", "max test"));	
		})
		promise.then((successMessage)=>{
			expect(successMessage.status).to.equal("success");
		})
		//~ var res =await mail.sendMail("u13286383@tuks.co.za","OTP","hi", "testing", "max test");
		//~ console.log(res.status +" here it is ");
   		//~ expect(res.status).to.equal("success");

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
  this.timeout(10000);
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
        expect(res.status).to.equal("failed");
        done();
  },10000)
    
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
  url: 'http://127.0.0.1:5000',
  headers: 
   { 'Postman-Token': 'fe00621e-2cbe-4120-83c5-1b340d0b541e',
     'cache-control': 'no-cache',
     'Content-Type': 'application/json' },
  body: JSON.stringify(jsonObj)
};




request(options,async  function (error, response, body) {
 	var res = await body
 	// console.log(body)
  	return res;
})

}




