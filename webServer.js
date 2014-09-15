var express = require('express');
var http = require('http');
var commandDispatcher = require('./server/commandDispatcher');
var EventEmitter = require('events').EventEmitter;

var app = express();
var server = http.Server(app);

var io = require('socket.io')(server);

var messages = [];

app.use(express.static(__dirname + '/www'));

server.listen(4567);

io.on('connection', function (socket) {
	socket.on('publishMessage', function(message){
		messages.push(message);
    io.emit('newMessages', messages);
  });

  socket.emit('newClient', { title: 'Chat Room' });
  socket.emit('newMessages', messages);
});
