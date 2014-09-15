window.emit = null;

window.onload = function(){ 
  
  var socket = io();

  React.renderComponent(<Header title="React Chat"/>, document.getElementById('Header'))
  React.renderComponent(<NameForm/>, document.getElementById('NameForm'))
  
  socket.on('userAllowedAccess', function(user){ 
    React.unmountComponentAtNode(document.getElementById('NameForm'));
    React.renderComponent(<ChatForm author={user.name}/>, document.getElementById('ChatForm'))
  });

  socket.on('newUserAdded', function(data){      
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