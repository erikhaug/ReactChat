var MessageList = React.createClass({
  scrollToBottom: function(){
    var elem = this.getDOMNode();
    elem.scrollTop = elem.scrollHeight;
  },
  componentDidUpdate: function () {
    this.scrollToBottom();
  },
  render : function () {
    return (
      <div className="list-group">
        {this.props.messages.map((message, index) =>
          <Message message={message}/>
        )}
      </div>
    );
  }
})