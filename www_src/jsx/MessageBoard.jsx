var MessageBoard = React.createClass({
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
      <div className="MessageBoard">
        {this.props.messages.map(message =>
          <MessageRow message={message} />
        )}
      </div>
    );
  }
})