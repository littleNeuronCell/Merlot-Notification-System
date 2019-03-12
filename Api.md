# API reference:
---
## Notify
The Notify is the main service we provide and will send notifications to clients based on their preference type/ type of notification
```javascript 
boolean notify(Client client, String type, Object contents);
```
@return: Will return true or false based on if it successfully notified the client

@params:
>client: will use a receive a client object with their relevant details such as email, cell, name, preferred notify method, etc...  
>type: will specify what type of notifcation needs to be sent, this will affect how we interact with the contents  
>  - valid types are: OTP, BalanceUpdate, BalanceEnquiry, BankStatement

example usage: DUE TO CHANGE
```javascript
  ClientNotication cn = new ClientNotication()
  Client someClient;
  if(!cn.notify(someClient,"BankStatement", someclient.generateStatement())
    console.log("Something went wrong")
```
---
