
module.exports = function(events, io){
  events.on('newMessageHasBeenPosted', function(newMessages){    
      io.emit('newMessages', newMessages);
  });
};

