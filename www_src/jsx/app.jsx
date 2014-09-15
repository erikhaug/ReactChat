window.emit = null;

window.onload = function(){ 
  
  var socket = io();

  var messages = [];
  var me = {};
    
  socket.on('welcome', function(user){
    me = user;
    console.log("welcome", user);
  });  

  socket.on('users', function(data){
    console.log("users", data);
  });

  socket.on('messages', function(data){
    console.log("messages", data);
  });
     
  window.emit = function(event, data){
    socket.emit(event, data);
  }
  
}