# API reference:
---
## Notify
The Notify is the main service we provide and will send notifications to clients based on their preference type/ type of notification.
The service will be accessed by making use of POST requests to our system
```
http://someLinkToBeAddedHere:port/
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
>  
> **valid types are**: OTP, card, generic

### Example Json
card
```javasript
{
    "ClientID": {{ClientID}},
    "Type": "card",
    "Content": {
        "cardnumber": {{RandomCard}},
        "pin":{{cardPin}}
    }
}
```
OTP
```
{
    "ClientID": {{ClientID}},
    "Type": "OTP",
    "Content": {
        "pin": {{RandomNumber}}
    }
}
```
Generic
```javasript
{
    "ClientID": {{ClientID}},
    "Type": "generic",
    "Content": {
        "subject": "This is the Subject Header",
        "body":"a nicely formatted html body that we will combine with our template",
        "file":{{filesent}}
    }
}
```

### example usage: 
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
```javascript
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
