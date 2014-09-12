/** @jsx React.DOM */
var ChatRoom = React.createClass({displayName: 'ChatRoom',
	render : function () {
		console.log("ChatRoom");
		return (
			React.DOM.h1(null, "Chat Room")
			);
	}
})
/** @jsx React.DOM */
window.emit = null;

window.onload = function(){ 
  
  var socket = io();
  
  socket.on('stateChanged', function(data){    
    console.log("App: State Changed");
    React.renderComponent(ChatRoom(null), document.getElementById('ChatRoom'))
  });
     
  window.emit = function(event, data){
    socket.emit(event, data);
  }
  
}