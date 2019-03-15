# API reference:
---
## Notify
The Notify is the main service we provide and will send notifications to clients based on their preference type/ type of notification
```javascript 
Object notify(Object data);
```
@return: Will return a json object with contains the following attributes, respCode and respMsg
>   **respCode**: will return a html response code  
>   **respMsg**: will return a message notifying whether or no the function succeeded or why it failed 
>   for additional info please consult our table below  
@params:  
>**data**: Data is an JSON object containing all our relevant information, explaination to follow  
>**ClientID**: The ID of the client  
>**Type**: the type of notification to be done  
>**Content**: the information that will be neatly displayed  

BankStatement
```javasript
{
	"ClientID" : "001",
	"Type" : "Bankstatement",
	"Content" : {
			"0": "25April",
			"1": "25April",
			"2": "25April",
			"3": "25April",
			"4": "25April",
			"5": "25April"
		}
}
```
OTP
```
{
    "ClientID": "001",
    "Type": "OTP",
    "Content": {
        "pin": {{RandomNumber}}
    }
}
```
>  - valid types are: OTP, BalanceUpdate, BalanceEnquiry, BankStatement

example usage: 
Java
```java
  OkHttpClient client = new OkHttpClient();

MediaType mediaType = MediaType.parse("text/plain");
RequestBody body = RequestBody.create(mediaType, "{\n    \"ClientID\": \"001\",\n    \"Type\": \"OTP\",\n    \"Content\": {\n        \"pin\": {{RandomNumber}}\n    }\n}");
Request request = new Request.Builder()
  .url("http://127.0.0.1:5555")var request = require("request");

var options = { method: 'POST',
  url: 'http://127.0.0.1:5555',
  headers: 
   { 'Postman-Token': 'fe00621e-2cbe-4120-83c5-1b340d0b541e',
     'cache-control': 'no-cache',
     'Content-Type': 'application/json' },
  body: '{\n    "ClientID": "001",\n    "Type": "OTP",\n    "Content": {\n        "pin": {{RandomNumber}}\n    }\n}' };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

  .post(body)
  .addHeader("Content-Type", "application/json")
  .addHeader("cache-control", "no-cache")
  .addHeader("Postman-Token", "316d8406-7dcd-434e-9e87-29e9f74e6fe6")
  .build();

Response response = client.newCall(request).execute();
```
NodeJS
```
var request = require("request");

var options = { method: 'POST',
  url: 'http://127.0.0.1:5555',
  headers: 
   { 'Postman-Token': 'fe00621e-2cbe-4120-83c5-1b340d0b541e',
     'cache-control': 'no-cache',
     'Content-Type': 'application/json' },
  body: '{\n    "ClientID": "001",\n    "Type": "OTP",\n    "Content": {\n        "pin": {{RandomNumber}}\n    }\n}' };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

```
