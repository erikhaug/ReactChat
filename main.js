var express = require('express');
var http = require('http');
var app = express();
var server = http.Server(app);
var io = require('socket.io')(server);
var qr = require('qr-image');

app.get('/qr.png', function(req, res){

  var os=require('os');
  var ifaces=os.networkInterfaces();
  
  for (var dev in ifaces) {
    ifaces[dev].forEach(function(details){
      if (details.family == 'IPv4' && details.internal == false) {
        var code = qr.image('http://'+details.address+':1337', { type: 'png' });
        res.type('png');
        code.pipe(res);
      }
    });
    break;
  }

});

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