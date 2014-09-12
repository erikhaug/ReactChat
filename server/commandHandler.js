module.exports = function(on, events){
	on('sendStateToClient', function(socket){
		console.log('Command dispatcher');
   		events.emit('stateChanged', socket);
  });
}