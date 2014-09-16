window.emit = null;

window.onload = function(){ 
  
  var socket = io();

  var messages = [];
  var me = {};
  var bubbles = React.renderComponent(<Bubbles />, document.querySelector('#bubbleAnimation'));

  var username = localStorage.getItem('user');

  if (username) {
    socket.emit('newUser',username);
  };
  
  React.renderComponent(<Header title="React chat"/>, document.querySelector('#Header'))
  React.renderComponent(<Login />, document.querySelector('#Login'))
  socket.on('welcome', function(user){
    me = user;
    console.log("welcome", user);
    localStorage.setItem('user', me.username);
    React.unmountComponentAtNode(document.querySelector('#Login'))
    React.renderComponent(<MessageBoard onPublishMessage= {function (message) {
                                                            emit('publishMessage', {text: message, user: me});
                           }}/>, document.querySelector('#MessageBoard'))
  });  

  socket.on('users', function(data){
    console.log("users", data);
    React.renderComponent(<UserList users={data} />, document.querySelector('#UserList'));
  });

  socket.on('messages', function(data){
    console.log("messages", data);
    React.renderComponent(<MessageList messages={data} />, document.querySelector('#MessageList'));
  });

  socket.on('poke', function(data){
    if (!bubbles.running) {
      console.log("poked by ", data);
      bubbles.start();
    }
  });
     
  window.emit = function(event, data){
    socket.emit(event, data);
  }
  
}