/** @jsx React.DOM */
var ChatForm = React.createClass({displayName: 'ChatForm',
  submit : function  (e) {
    e.preventDefault();
    var author = this.props.author;
    var message = this.refs.message.getDOMNode().value.trim();    
    if (!message) {
      return;
    }
    emit('publishMessage', {name : author, text : message});
    this.refs.message.getDOMNode().value = '';
  },
  render : function () {
    return (
      React.DOM.form({className: "form"}, 
        React.DOM.div({className: "form-group"}, 
          React.DOM.div({className: "input-group"}, 
            React.DOM.input({type: "text", className: "form-control", placeholder: "Your message", ref: "message", autoFocus: true}), 
            React.DOM.span({className: "input-group-btn"}, 
              React.DOM.button({className: "btn btn-success", onClick: this.submit, type: "submit"}, "Send")
            )
          )
        )
      )
    );
  }
})
/** @jsx React.DOM */
var Header = React.createClass({displayName: 'Header',
  render : function () {
    return (
      React.DOM.header({className: "page-header"}, 
        React.DOM.h1(null, this.props.title)
      )
    );
  }
})
/** @jsx React.DOM */
var MessageBoard = React.createClass({displayName: 'MessageBoard',
  componentDidUpdate: function(){
    this.scrollToBottom();
  },
  componentDidMount: function(){
    this.scrollToBottom();
  },
  scrollToBottom: function(){
    var elem = this.getDOMNode();
    elem.scrollTop = elem.scrollHeight;
  },
  render : function () {
    return (
      React.DOM.div({className: "list-group"}, 
        this.props.messages.map(function(message) 
          {return MessageRow({message: message});}
        )
      )
    );
  }
})
/** @jsx React.DOM */
var MessageRow = React.createClass({displayName: 'MessageRow',
  render : function () {
    return (
      React.DOM.div({className: "list-group-item"}, 
        React.DOM.h4({className: "list-group-item-heading"}, this.props.message.text), 
        React.DOM.strong({className: "list-group-item-text"}, this.props.message.name), 
        " • ", 
        React.DOM.span({className: "list-group-item-text text-muted"}, 
          PrettyTime({value: this.props.message.timestamp})
        )
      )
    );
  }
})
/** @jsx React.DOM */
var NameForm = React.createClass({displayName: 'NameForm',
  submit: function (e) {
    e.preventDefault();
    var author = this.refs.author.getDOMNode().value.trim();
    if (!author) {
      return;
    };
    emit('newUser', {name : author});
  },
  render: function() {
    return (
      React.DOM.div({className: "col-sm-4 NameForm"}, 
        React.DOM.form({className: "form-inline"}, 
          React.DOM.div({className: "form-group"}, 
            React.DOM.input({type: "text", placeholder: "Your name", className: "form-control", ref: "author", autoFocus: true}), 
            React.DOM.button({onClick: this.submit, className: "btn btn-success pull-right"}, "Start")
          )
        )
      )
    );
  }
});
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
var UserPanel = React.createClass({displayName: 'UserPanel',
    
  render: function() {
    return (
      React.DOM.ul({className: "list-group"}, 
        this.props.allUsers.map(function(user)   
          {return React.DOM.li({className: "list-group-item"}, user);}
        )
      )
    );
  }
});
/** @jsx React.DOM */
window.emit = null;

window.onload = function(){ 
  
  var socket = io();

  React.renderComponent(Header({title: "React Chat"}), document.getElementById('Header'))
  React.renderComponent(NameForm(null), document.getElementById('NameForm'))
  
  socket.on('userAllowedAccess', function(user){ 
    React.unmountComponentAtNode(document.getElementById('NameForm'));
    React.renderComponent(ChatForm({author: user.name}), document.getElementById('ChatForm'))
  });

  socket.on('newUserAdded', function(data){ 
    console.log(" Users : ",data);
    React.renderComponent(UserPanel({allUsers: data}), document.getElementById('Users'))     
  });

  socket.on('newMessages', function(data){    
    React.renderComponent(MessageBoard({messages: data}), document.getElementById('MessageBoard'))
  });
     
  window.emit = function(event, data){
    socket.emit(event, data);
  }
  
}