# Merlot-Notification-System
###  <a href="https://github.com/littleNeuronCell/Merlot-Notification-System/blob/master/Api.md" target="_blank">API reference</a>
###  <a href="https://github.com/littleNeuronCell/Merlot-Notification-System/issues" target="_blank">Issues</a>


## Other Subsystems:
- ATM Simulation
- Authentication
- Facial Recognition
- NFC
- OTP
- Client Information System
- Client Account System
- Reporting

### Expected from us:
- Provide a service to other modules to deliver notifications. The requestor must provide the clientID and the content of the notification.
- Uses a service provided by the Client Information System to obtain e-mail address registered to the clientID and then deliver the notification to the clientID.
- Set up a mail server to handle email notifications.
- Keep a Module Audit log and provide a service to produce a portion of the log within a specified time span. 

### Subsystems that interacts with us

- **OTP**:
  - Send Client OTP (probably wants sms)
- **Client Information System**:
  - Send miniStatement via Email
- **Client Account System**:
  - Notify client of balance update
- **Reporting**:
  - View Notification Log
