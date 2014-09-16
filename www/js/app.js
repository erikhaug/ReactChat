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
          this.props.message
        ), 
        React.DOM.strong({className: "list-group-item-text"}, 
          this.props.username
        ), 
        " • ", 
        React.DOM.span({className: "list-group-item-text text-muted"}, 
          PrettyTime({value: this.props.timestamp})
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
        MessageList({messages: this.props.messages}), 
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
  componentDidUpdate: function(){
    this.scrollToBottom();
  },
  scrollToBottom: function(){
    var elem = this.getDOMNode();
    elem.scrollTop = elem.scrollHeight;
  },
  render : function () {
    return (
      React.DOM.div({className: "list-group"}, 
        this.props.messages.map(function(message, index)  
          {return Message({message: message.text, username: message.username, timestamp: message.timestamp, key: index});}
        )
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
  sendPoke: function(e){
    var id = e.target.dataset['id'];
    
    emit('pokeUser', id);
  },
  render: function() {
    return (
      React.DOM.div({className: "panel panel-default"}, 
        React.DOM.div({className: "panel-heading"}, 
          "Users"
        ), 
        React.DOM.ul({className: "list-group"}, 
        this.props.users.map(function(user) 
          {return React.DOM.li({className: "list-group-item clickable", key: user.id, 'data-id': user.id, onClick: this.sendPoke}, 
            user.username
          );}.bind(this)
        )
        ), 
        React.DOM.div({className: "panel-footer"}, 
          LogoutButton(null)
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
    localStorage.setItem('user', user.username);
    React.unmountComponentAtNode(document.querySelector("#Login"));
    React.renderComponent(MessageBoard({messages: messages}), document.querySelector('#MessageBoard'));
  });  

  socket.on('users', function(data){
    console.log("users", data);
    React.renderComponent(UserList({users: data}), document.querySelector('#UserList'));
  });

  socket.on('messages', function(data){
    console.log("messages", data);
    messages = data;
    React.renderComponent(MessageBoard({messages: messages}), document.querySelector('#MessageBoard'));
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