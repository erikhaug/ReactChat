/** @jsx React.DOM */
var Bubbles =  React.createClass({displayName: 'Bubbles',
  running : false,
  start : function () {
      if (!this.running) {
        this.running = true;
        setTimeout(function () {
          this.stop();
        }.bind(this), 10000);
        this.forceUpdate();
      }
  },
  stop : function () {
    this.running = false;
    this.forceUpdate();
  },
  render : function () {
    if (this.running) {
      return (
        React.DOM.div({id: "bubbles"}, 
            React.DOM.div({className: "bubble x1"}), 
            React.DOM.div({className: "bubble x2"}), 
            React.DOM.div({className: "bubble x3"}), 
            React.DOM.div({className: "bubble x4"}), 
            React.DOM.div({className: "bubble x5"})
      )              
      )
    } else {
      return (
        React.DOM.div(null)
        )
    }
  }
});



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
    var username = this.refs.username.getDOMNode().value.trim()
    
    if (!username) {
      return;
    }
    
    emit('newUser',username)
  },
  render: function() {
    return (
      React.DOM.div({className: "jumbotron"}, 
        React.DOM.form({className: "form"}, 
          React.DOM.div({className: "input-group"}, 
            React.DOM.input({type: "text", placeholder: "Your name", className: "form-control", ref: "username", autoFocus: true}), 
            React.DOM.span({className: "input-group-btn"}, 
              React.DOM.button({className: "btn btn-success", type: "submit", onClick: this.submit}, "Start")
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
          this.props.message.text
        ), 
        React.DOM.strong({className: "list-group-item-text"}, 
          this.props.message.user.username
        ), 
        " • ", 
        React.DOM.span({className: "list-group-item-text text-muted"}, 
          PrettyTime({value: this.props.message.timestamp})
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
          React.DOM.h3(null, "Messages")
        ), 
        React.DOM.div({id: "MessageList"}
          
        ), 
        React.DOM.div({className: "panel-footer"}, 
          MessageInput({onPublishMessage: this.props.onPublishMessage})
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
    this.props.onPublishMessage(message);
    this.refs.message.getDOMNode().value = '';
  },
  render : function () {
    return (
      React.DOM.form({className: "form"}, 
        React.DOM.div({className: "input-group"}, 
          React.DOM.input({type: "text", className: "form-control", placeholder: "Your message", ref: "message", autoFocus: true}), 
          React.DOM.span({className: "input-group-btn"}, 
            React.DOM.button({className: "btn btn-success", type: "submit", onClick: this.submit}, "Send")
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
  componentDidUpdate: function () {
    this.scrollToBottom();
  },
  render : function () {
    return (
      React.DOM.div({className: "list-group"}, 
        this.props.messages.map(function(message, index) 
          {return Message({message: message});}
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
  poke: function (e) {
    e.preventDefault();
    var userId = e.target.dataset['id'];
    emit('pokeUser', userId);
  },
  render: function() {
    return (
      React.DOM.div({className: "panel panel-default"}, 
        React.DOM.div({className: "panel-heading"}, 
          React.DOM.h3(null, "Users")
        ), 
        React.DOM.ul({className: "list-group"}, 
          this.props.users.map(function(user, index) 
          {return React.DOM.li({className: "list-group-item clickable", onClick: this.poke, 'data-id': user.id}, user.username);}.bind(this)
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
  var bubbles = React.renderComponent(Bubbles(null), document.querySelector('#bubbleAnimation'));

  var username = localStorage.getItem('user');

  if (username) {
    socket.emit('newUser',username);
  };
  
  React.renderComponent(Header({title: "React chat"}), document.querySelector('#Header'))
  React.renderComponent(Login(null), document.querySelector('#Login'))
  socket.on('welcome', function(user){
    me = user;
    console.log("welcome", user);
    localStorage.setItem('user', me.username);
    React.unmountComponentAtNode(document.querySelector('#Login'))
    React.renderComponent(MessageBoard({onPublishMessage: function (message) {
                                                            emit('publishMessage', {text: message, user: me});
                           }}), document.querySelector('#MessageBoard'))
  });  

  socket.on('users', function(data){
    console.log("users", data);
    React.renderComponent(UserList({users: data}), document.querySelector('#UserList'));
  });

  socket.on('messages', function(data){
    console.log("messages", data);
    React.renderComponent(MessageList({messages: data}), document.querySelector('#MessageList'));
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