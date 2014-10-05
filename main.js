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
  var user = null;
  
  socket.on('newUser', function(username){
    if(username.length){
      user = {
        username: username,
        id: socket.id
      }
      users.push(user);

      socket.emit('welcome', user);
      socket.join(groupName);

      io.to(groupName).emit('users', users);
      socket.emit('messages', messages);
    }
  });

  socket.on('publishMessage', function(text){
    var message = {
      text: text,
      username: user.username,
      userId: user.id,
      timestamp: new Date()
    };
    
    messages.push(message);
    io.to(groupName).emit('messages', messages);
  });

  socket.on('disconnect', function(){
    var indexOfUser = users.indexOf(user);
    if(indexOfUser !== -1) {
      users.splice(indexOfUser, 1);
    }
    io.to(groupName).emit('users', users);
  });
  
  socket.on('pokeUser', function(userId){
    io.to(userId).emit('poke', user.username);
  });
});

console.log("chat running on http://localhost:1337");