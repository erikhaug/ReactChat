var express = require('express');
var http = require('http');
var app = express();
var server = http.Server(app);
var io = require('socket.io')(server);

app.use(express.static(__dirname + '/www'));
server.listen(1337);

var messages = [];
var users = [];

var groupName = 'ChatRoom';

io.on('connection', function (socket) {
  var thisUser = null;

  socket.on('newUser', function(user){
    if(user.name.length){
      users.push(user);
      thisUser = user;

      socket.emit('welcome', user);
      socket.join(groupName);

      io.to(groupName).emit('users', users);
      socket.emit('messages', messages);      
    }
  });

  socket.on('publishMessage', function(message){
    message.timestamp = new Date();
    messages.push(message);
    io.to(groupName).emit('messages', messages);
  });

  socket.on('disconnect', function(message){
    var indexOfUser = users.indexOf(thisUser);
    if(indexOfUser !== -1) {
      users.splice(indexOfUser, 1);
    }
    io.to(groupName).emit('users', users);
  });
});

console.log("chat running on http://localhost:1337");