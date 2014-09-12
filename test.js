var express = require('express');
var http = require('http');

var app = express();
var server = http.Server(app);

var io = require('socket.io')(server);

app.use(express.static(__dirname + '/www'));

server.listen(1337);

io.on('connection', function (socket) {
	console.log("Connectio received");
  	socket.emit('news', { hello: 'world' });
  	socket.on('my other event', function (data) {
    console.log(data);
  });
});