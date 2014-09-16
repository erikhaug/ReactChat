/** @jsx React.DOM */
var Header = React.createClass({displayName: 'Header',
  render : function () {
    return (
      React.DOM.h1(null, this.props.title)
    );
  }
})
/** @jsx React.DOM */
var Login = React.createClass({displayName: 'Login',
  submit: function (e) {
    e.preventDefault();
    
    var username = this.refs.username.getDOMNode().value.trim();
    
    if (!username) {
      return;
    }
    
    emit("newUser", username);
  },
  render: function() {
    return (
      React.DOM.div({className: "jumbotron"}, 
        React.DOM.form({className: "form"}, 
          React.DOM.div({className: "input-group"}, 
            React.DOM.input({type: "text", placeholder: "Your name", className: "form-control", ref: "username", autoFocus: true}), 
            React.DOM.span({className: "input-group-btn"}, 
              React.DOM.button({className: "btn btn-success", onClick: this.submit, type: "submit"}, "Start")
            )
          )
        )
      )
    );
  }
});
/** @jsx React.DOM */
var LogoutButton = React.createClass({displayName: 'LogoutButton',
  logout: function (e) {
    e.preventDefault();
    localStorage.removeItem('user');
    window.location.reload();
  },
  render: function() {
    return (
      React.DOM.div({className: "clearfix"}, 
        React.DOM.button({onClick: this.logout, className: "btn btn-danger pull-right"}, "Log out")
      )
    );
  }
});
/** @jsx React.DOM */
var Message = React.createClass({displayName: 'Message',
  render : function () {
    return (
      React.DOM.div({className: "list-group-item"}, 
        React.DOM.h4({className: "list-group-item-heading"}, 
          "message"
        ), 
        React.DOM.strong({className: "list-group-item-text"}, 
          "username"
        ), 
        " • ", 
        React.DOM.span({className: "list-group-item-text text-muted"}, 
          "timestamp"
        )
      )
    );
  }
})
/** @jsx React.DOM */
var MessageBoard = React.createClass({displayName: 'MessageBoard',
  render : function () {
    return (
      React.DOM.div({className: "panel panel-default"}, 
        React.DOM.div({className: "panel-heading"}, 
          "Messages"
        ), 
        "put message list here", 
        React.DOM.div({className: "panel-footer"}, 
          MessageInput(null)
        )
      )
    );
  }
})
/** @jsx React.DOM */
var MessageInput = React.createClass({displayName: 'MessageInput',
  submit : function  (e) {
    e.preventDefault();
    
    var message = this.refs.message.getDOMNode().value.trim();
    if (!message) {
      return;
    }
    
    emit('publishMessage', message);
    this.refs.message.getDOMNode().value = "";
  },
  render : function () {
    return (
      React.DOM.form({className: "form"}, 
        React.DOM.div({className: "input-group"}, 
          React.DOM.input({type: "text", className: "form-control", placeholder: "Your message", ref: "message", autoFocus: true}), 
          React.DOM.span({className: "input-group-btn"}, 
            React.DOM.button({className: "btn btn-success", onClick: this.submit, type: "submit"}, "Send")
          )
        )
      )
    );
  }
})
/** @jsx React.DOM */
var MessageList = React.createClass({displayName: 'MessageList',
  scrollToBottom: function(){
    var elem = this.getDOMNode();
    elem.scrollTop = elem.scrollHeight;
  },
  render : function () {
    return (
      React.DOM.div({className: "list-group"}, 
        "render all messages here"
      )
    );
  }
})
/** @jsx React.DOM */
var PrettyTime = React.createClass({displayName: 'PrettyTime',
  ticker: null,
  componentDidMount: function() {
    return this.ticker = setInterval(function(){
      this.forceUpdate()
    }.bind(this), 3000);
  },
  componentWillUnmount: function() {
    if (this.ticker) {
      return clearInterval(this.ticker);
    }
  },
  render : function () {
    var value = moment(this.props.value);
    var prettyTime = value.fromNow();
    var uglyTime = value.format('LLLL');
    return (
      React.DOM.time({title: uglyTime}, prettyTime)
    );
  }
})
/** @jsx React.DOM */
var UserList = React.createClass({displayName: 'UserList',

  render: function() {
    return (
      React.DOM.div({className: "panel panel-default"}, 
        React.DOM.div({className: "panel-heading"}, 
          "Users"
        ), 
        React.DOM.ul({className: "list-group"}, 
          "many users"
        ), 
        React.DOM.div({className: "panel-footer"}, 
          "click here to log out"
        )
      )
    );
  }
});
/** @jsx React.DOM */
window.emit = null;

window.onload = function(){ 
  
  var socket = io();

  var messages = [];
  var me = {};
  
  var title = "React Chat";
  
  React.renderComponent(Header({title: title}), document.querySelector('#Header'));
  React.renderComponent(Login(null), document.querySelector('#Login'));
    
  socket.on('welcome', function(user){
    me = user;
    console.log("welcome", user);
    React.unmountComponentAtNode(document.querySelector("#Login"));
    React.renderComponent(MessageBoard(null), document.querySelector('#MessageBoard'));
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