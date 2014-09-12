window.emit = null;

window.onload = function(){ 
  
  var socket = io();
  
  socket.on('stateChanged', function(data){    
    console.log("App: State Changed");
    React.renderComponent(<ChatRoom />, document.getElementById('ChatRoom'))
  });
     
  window.emit = function(event, data){
    socket.emit(event, data);
  }
  
}