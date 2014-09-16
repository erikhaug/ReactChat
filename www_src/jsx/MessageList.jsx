var MessageList = React.createClass({
  componentDidUpdate: function(){
    this.scrollToBottom();
  },
  scrollToBottom: function(){
    var elem = this.getDOMNode();
    elem.scrollTop = elem.scrollHeight;
  },
  render : function () {
    return (
      <div className="list-group">
        {this.props.messages.map((message, index) => 
          <Message message={message.text} username={message.username} timestamp={message.timestamp} key={index} />
        )}
      </div>
    );
  }
})