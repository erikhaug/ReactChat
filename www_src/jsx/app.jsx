window.emit = null;

window.onload = function(){ 
  
  var socket = io();

  var messages = [];
  var me = {};
  
  var title = "React Chat";
  
  React.renderComponent(<Header title={title} />, document.querySelector('#Header'));
  React.renderComponent(<Login />, document.querySelector('#Login'));
      
  socket.on('welcome', function(user){
    me = user;
    console.log("welcome", user);
    localStorage.setItem('user', user.username);
    React.unmountComponentAtNode(document.querySelector("#Login"));
    React.renderComponent(<MessageBoard messages={messages} />, document.querySelector('#MessageBoard'));
  });  

  socket.on('users', function(data){
    console.log("users", data);
    React.renderComponent(<UserList users={data} />, document.querySelector('#UserList'));
  });

  socket.on('messages', function(data){
    console.log("messages", data);
    messages = data;
    React.renderComponent(<MessageBoard messages={messages} />, document.querySelector('#MessageBoard'));
  });
  
  socket.on('poke', function(from){
    document.body.classList.remove("poke-animation");
    document.body.offsetWidth = document.body.offsetWidth;
    document.body.classList.add("poke-animation");
  });
     
  window.emit = function(event, data){
    socket.emit(event, data);
  }
  
  if(localStorage.hasOwnProperty('user')){
    emit('newUser', localStorage.getItem('user'));
  }
  
}