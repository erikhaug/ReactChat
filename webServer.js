var express = require('express');
var http = require('http');
var commandHandler = require('./server/commandHandler');
var commandDispatcher = require('./server/commandDispatcher');
var EventEmitter = require('events').EventEmitter;
var socketEventHandler = require('./server/socketEventHandler');

var app = express();
var server = http.Server(app);

var io = require('socket.io')(server);

var dispatcher = commandDispatcher();
var command = dispatcher.command;

var messages = [];

app.use(express.static(__dirname + '/www'));

server.listen(1337);

io.on('connection', function (socket) {
	socket.on('publishMessage', function(message){
		messages.push(message);
    	io.emit('newMessages', messages);
  	});
  	
  	socket.emit('newClient', { title: 'Chat Room' });
  	socket.emit('newMessages', messages);
});

function pipeSocketToCommand(socket, name, command){
  socket.on(name, function(data){
    command(name, data);
  });
}