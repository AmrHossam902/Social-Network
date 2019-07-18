
const express = require("express");
const socketio = require("socket.io");

var http_server = app.listen(5555);
var io_server = socketio(http_server,{});

var globals = {};


var app = express();
