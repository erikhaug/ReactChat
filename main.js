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
  var thisUser = null;

  socket.on('newUser', function(user){
    if(user.name.length){
      users.push(user.name);
      thisUser = user;
      socket.emit('userAllowedAccess', user);
      socket.join('ChatRoom');
      io.to('ChatRoom').emit('newUserAdded', users);
      socket.emit('newMessages', messages);
      
    }
  });

  socket.on('publishMessage', function(message){
    message.timestamp = new Date();
    messages.push(message);
    io.to('ChatRoom').emit('newMessages', messages);
  });

  socket.on('disconnect', function(message){
    users.splice(users.indexOf(thisUser), 1);
    io.to('ChatRoom').emit('newUserAdded', users);
  });
});