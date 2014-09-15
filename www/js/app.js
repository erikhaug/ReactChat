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
			React.DOM.div({className: "ChatForm"}, 
				React.DOM.form({className: "form-horizontal ", role: "form"}, 
				  React.DOM.div({className: "form-group"}, 
				    React.DOM.label({htmlFor: "inputMessage", className: "col-sm-2 control-label"}, "Message"), 
				    React.DOM.div({className: "col-sm-10"}, 
						React.DOM.textarea({className: "form-control", placeholder: "Your message", rows: "3", ref: "message"})
				    )
				  ), 
				  
				  React.DOM.div({className: "form-group "}, 
				    React.DOM.div({className: "col-sm-12 btn-group"}, 
				      React.DOM.button({onClick: this.submit, className: "btn btn-lg btn-success pull-right"}, "Send")
				    )
				  )
				)
			)

			);
	}
})
/** @jsx React.DOM */
var Header = React.createClass({displayName: 'Header',
	submitMessage : function (message) {
		console.log(message);
		
	},
	render : function () {
		return (
			React.DOM.div(null, 				
				React.DOM.header({className: "page-header"}, 
					React.DOM.h1(null, this.props.title)
				)		
				
			)
		
			);
	}
})
/** @jsx React.DOM */
var MessageBoard = React.createClass({displayName: 'MessageBoard',
	render : function () {
		return (
			React.DOM.div({className: "MessageBoard"}, 
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
      React.DOM.div({className: "MessageRow"}, 
        React.DOM.span({className: "author"}, this.props.message.name), 
        React.DOM.p({className: "message"}, this.props.message.text), 
        PrettyTime({className: "timestamp", value: this.props.message.timestamp})
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
					    React.DOM.input({type: "text", placeholder: "Your name", className: "form-control", ref: "author"}), 
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
  });

  socket.on('newMessages', function(data){    
    React.renderComponent(MessageBoard({messages: data}), document.getElementById('MessageBoard'))
    var elem = document.getElementById('MessageBoard');
    elem.scrollTop = elem.scrollHeight;
  });
     
  window.emit = function(event, data){
    socket.emit(event, data);
  }
  
}