//TEST 1
//Calling the function like in unitTesting.js
/*
  var res=log.logSystem('');
*/
//TEST 1 Testing if the JSON object is empty
/*
logSystem();
function logSystem(jsonObj){
  function isEmptyObject(obj) {
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        return false;
      }
    }
    return true;
  }
  if(isEmptyObject(jsonObj)) {
    // Empty JSON object
    console.log("Empty JSON");
  } else {
    console.log("JSON is not empty");
  }

}

*/

/*
//TEST 2 Testing when passing many arguments
logSystem({"client_id":"12121","content":"staff", "type":"OTP","status":"checking"}); //many arguments
//logSystem({"client_id":"12121","content":"staff", "type":"OTP"}); //success
function logSystem(jsonObj){
  function length(obj) {
      return Object.keys(obj).length;
  }
    if(length (jsonObj) >3){
        console.log("Many arguments passed.");
    }
    else{
        console.log("Success");
    }
}
*/





/*
//TEST 3 Checking whether its a JSON Object passed
//logSystem("");//Invalid JSON passed
logSystem({"client_id":"12121","content":"staff", "type":"OTP","status":"checking"});//Valid JSON test
function logSystem(jsonObj){
    if((typeof jsonObj) == "object"){
        console.log("Success JSON object passed");
    }
    else{
        console.log("Invalid JSON passed");
    }
}
*/
