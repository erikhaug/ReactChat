var connect = require('connect');
var router = require('urlrouter');
var socketIo = require('socket.io');
var EventEmitter = require('events').EventEmitter;

var commandDispatcher = require('./server/commandDispatcher');
var webServer = require('./server/webServer');
var socketServer = require('./server/socketServer');
var commandHandler = require('./server/commandHandler');
var socketEventHandler = require('./server/socketEventHandler');

var dispatcher = commandDispatcher();
var command = dispatcher.command;
var events = new EventEmitter();

var app = connect(router(webServer(command))).listen(8889);
var io = socketIo(app).on('connection', socketServer(command));

commandHandler(dispatcher.on, events);

socketEventHandler(events, io);

console.log("started server on port 8889");