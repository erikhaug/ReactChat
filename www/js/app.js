/** @jsx React.DOM */
var ChatForm = React.createClass({displayName: 'ChatForm',
	submit : function  (e) {
		e.preventDefault();
	    var author = this.refs.author.getDOMNode().value.trim();
	    var message = this.refs.message.getDOMNode().value.trim();    
	    if (!message || !author) {
	      return;
	    }
	    this.props.onSubmit({name : author, text : message});

	    this.refs.message.getDOMNode().value = '';
	},
	render : function () {
		return (
			React.DOM.div({className: "ChatForm"}, 
				React.DOM.form({className: "form-horizontal ", role: "form"}, 
				  React.DOM.div({className: "form-group"}, 
				    React.DOM.label({htmlFor: "inputName", className: "col-sm-2 control-label"}, "Name"), 
				    React.DOM.div({className: "col-sm-4"}, 
						React.DOM.input({id: "inputName", type: "text", placeholder: "Your name", className: "form-control", ref: "author"})
				    )
				  ), 
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
var ChatRoom = React.createClass({displayName: 'ChatRoom',
	submitMessage : function (message) {
		console.log(message);
		emit('publishMessage', message);
	},
	render : function () {
		return (
			React.DOM.div(null, 
				React.DOM.header({className: "page-header"}, 
					React.DOM.h1(null, this.props.title)
				), 
				React.DOM.div({id: "MessageBoard", className: "MessageBoard"}

				), 
				React.DOM.div(null, 
					ChatForm({onSubmit: this.submitMessage})
				)
				
			)
		
			);
	}
})
/** @jsx React.DOM */
var MessageBoard = React.createClass({displayName: 'MessageBoard',
	render : function () {
		return (
			React.DOM.div(null, 
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
				React.DOM.span({className: "author"}, this.props.message.name, " "), 
				React.DOM.span({className: "text"}, "  ", React.DOM.p(null, this.props.message.text))
			)
		
			);
	}
})
/** @jsx React.DOM */
window.emit = null;

window.onload = function(){ 
  
  var socket = io();
  
  socket.on('newClient', function(data){    
    React.renderComponent(ChatRoom({title: data.title}), document.getElementById('ChatRoom'))
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