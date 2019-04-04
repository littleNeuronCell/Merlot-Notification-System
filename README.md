# Merlot-Notification-System
###  <a href="https://github.com/littleNeuronCell/Merlot-Notification-System/blob/master/Documentation/Api.md" target="_blank">API reference</a>
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
- The NS will provide a service when given a clientID, message subject line and a message body, to create an email message to the client.
  - Use a service provided by the CIS to obtain the email address of the client.
  - Optionally apply a template to compile the complete a specialized message. For example for sending an OTP, only the OTP needs to be passed to this service while the subject line and wording of the message body can be specified with a OTP message template.
- The NS will log all its events in a log file and push the file to the Reporting subsystem using a service provided by the reporting subsystem.

### Subsystems that interacts with us

- **OTP**:
  - Send Client OTP 
- **CRDS**:
  - Send a card password to a client via e-mail

### Subsystems that we interact with
- **Reporting**:
  - Pushing logs of notifications
- **Client Information**:
  - Getting Client information
