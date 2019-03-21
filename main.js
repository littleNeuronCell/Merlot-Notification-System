var express = require("express");
var app = express();
var server = require("http").createServer(app);
var os = require("os");
var Console = require("node-console-input");
var bodyParser = require('body-parser');
var Console = require("node-console-input");

var logs = require("./logSystem.js");

var PORT = 5555;
var HostAddress = os.hostname();
server.listen(PORT);
//logs.logs();
logs.logSystem('{"client_id":"12121", "type":"OTP", "content":"1234"}');
//counter.enteryCounter("temp.txt");
