var express = require('express');
var http = require('http');

var app = express();
var server = http.Server(app);

var io = require('socket.io')(server);

app.use(express.static(__dirname + '/www'));

server.listen(1337);

io.on('connection', function (socket) {
	console.log("Connection received");
  	socket.emit('newClient', { title: 'Chat Room' });
});