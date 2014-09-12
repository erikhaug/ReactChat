window.emit = null;

window.onload = function(){ 
  
  var socket = io();
  
  socket.on('newClient', function(data){    
    React.renderComponent(<ChatRoom title={data.title}/>, document.getElementById('ChatRoom'))
  });

  socket.on('newMessages', function(data){    
    React.renderComponent(<MessageBoard messages={data}/>, document.getElementById('MessageBoard'))
    var elem = document.getElementById('MessageBoard');
    elem.scrollTop = elem.scrollHeight;
  });
     
  window.emit = function(event, data){
    socket.emit(event, data);
  }
  
}