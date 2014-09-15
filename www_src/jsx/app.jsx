window.emit = null;

window.onload = function(){ 
  
  var socket = io();

  var user = localStorage.getItem('user');

  var messages = [];
  var me = {};

  React.renderComponent(<Header title="React Chat"/>, document.getElementById('Header'))
  React.renderComponent(<NameForm/>, document.getElementById('NameForm'))
  
  if (user) {
      socket.emit('newUser', {name: user});
  }

    
  socket.on('welcome', function(user){ 
    localStorage.setItem('user', user.name);
    me = user;
    React.unmountComponentAtNode(document.getElementById('NameForm'));

  });
  

  socket.on('users', function(data){ 
    React.renderComponent(<UserPanel allUsers={data}/>, document.getElementById('Users'))
  });

  socket.on('messages', function(data){    
    React.renderComponent(<MessageBoard messages={data} author={me.name}/>, document.getElementById('MessageBoard'))
  });
     
  window.emit = function(event, data){
    socket.emit(event, data);
  }
  
}