window.emit = null;

window.onload = function(){ 
  
  var socket = io();
  
  socket.on('newClient', function(data){    
    React.renderComponent(<ChatRoom title={data.title}/>, document.getElementById('ChatRoom'))
  });
     
  window.emit = function(event, data){
    socket.emit(event, data);
  }
  
}