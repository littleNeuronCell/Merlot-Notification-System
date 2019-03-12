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
>  - valid types are: OTP, BalanceUpdate, BalanceEnquiry, BankStatement

example usage: DUE TO CHANGE
```javascript
  ClientNotication cn = new ClientNotication()
  Client someClient;
  if(!cn.notify(someClient,"BankStatement", someclient.generateStatement())
    console.log("Something went wrong")
```
---
