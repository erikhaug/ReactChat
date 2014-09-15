var express = require('express');
var http = require('http');
var commandDispatcher = require('command-dispatcher');
var EventEmitter = require('events').EventEmitter;

var app = express();
var server = http.Server(app);

var io = require('socket.io')(server);

var messages = [];
var users = [];

app.use(express.static(__dirname + '/www'));

server.listen(1337);

io.on('connection', function (socket) {
  socket.on('publishMessage', function(message){
    messages.push(message);
    io.emit('newMessages', messages);
  });

  socket.on('newUser', function(user){
    if(user.name.length){
      users.push(user.name);
      io.emit('newUserAdded', user);
      socket.emit('userAllowedAccess', user);
      socket.emit('newMessages', messages);
    }
  });
});