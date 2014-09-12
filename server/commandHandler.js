module.exports = function(on, events){
	var messages = [];
	on('sendChatRoomState', function(client){
    	events.emit('newMessageHasBeenPosted', messages);
  	});

	on('publishMessage', function(message){
    	console.log(message);
    	messages.push(message);
    	events.emit('newMessageHasBeenPosted', messages);
  });
}