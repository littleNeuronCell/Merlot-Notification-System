var expect = require('chai').expect;
var fs = require("fs");
var log = require("../logSystem.js");
var request = require("request");

describe('Database Testing"', function () {
 	it('should create an entry to the notificationLogs.txt', function () {
 		var res = log.logSystem('{"client_id":"12121", "type":"OTP", "content":"1234"}');
    	expect(res.status).to.equal("success")
    });
    it('Attempting log with paramater Content', function () {
 		var res = log.logSystem('{"client_id":"12121", "type":"OTP"}');
    	expect(res.status).to.equal("failed")
    	expect(res.message).to.equal("missing arguement 'content'");

    });
    it('Attempting log with paramater type', function () {
 		var res = log.logSystem('{"client_id":"12121","content":"1234"}');
    	expect(res.status).to.equal("failed")
    	expect(res.message).to.equal("missing arguement 'type'");

    });
    it('Attempting log with paramater client_id', function () {
 		var res = log.logSystem('{"content":"1234", "type":"OTP"}');
    	expect(res.status).to.equal("failed")
    	expect(res.message).to.equal("missing arguement 'client_id'");

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


describe('API testing',function(){
	it("Sending an OTP notification",async function(){
		const res =await makeRequest(OTP);
		while(res == undefined){pausecomp(50)}
		res = JSON.stringify(res);

		console.log("API test: "+res);
   		// expect(res).to.equal(true);

	}); 	
})


var OTP = {
    "ClientID": "23432",
    "Type": "OTP",
    "Content": {
        "pin": "123456"
    }
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




