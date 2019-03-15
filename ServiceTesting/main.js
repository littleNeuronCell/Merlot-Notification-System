const sqlite3 = require('sqlite3').verbose();
var express = require("express");
var app = express();
var server = require('http').createServer(app);
const readline = require('readline');
app.disable('etag');
const terminal = require("./terminal.js");
//port to listen on

  var PORT = 8080;
  server.listen(PORT);

// open database in memory
// let db = new sqlite3.Database('../database/merlotInfoSys.db', (err) => {
//     if (err) {
//       return console.error(err.message);
//     }
//     console.log('Connected to the in-memory SQlite database.');
//   });
terminal.ConsoleInput();