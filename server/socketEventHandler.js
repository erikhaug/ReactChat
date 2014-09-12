
module.exports = function(events, io){
      
  events.on('stateChanged', function(client){    
      console.log("socket event handler");
      (client || io).emit('stateChanged', null);
  });
  
  
  
};

