const Nexmo = require('nexmo');
const nexmo = new Nexmo({
  apiKey: 'c0940665',
  apiSecret: 'ucyr3qZmn5Axobhj'
});

const from = 'Nexmo';
const to = '27814399897';
const text = 'The OTP generated code is ';

nexmo.message.sendSms(from, to, text);
