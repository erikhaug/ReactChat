var MessageList = React.createClass({
  scrollToBottom: function(){
    var elem = this.getDOMNode();
    elem.scrollTop = elem.scrollHeight;
  },
  render : function () {
    return (
      <div className="list-group">
        render all messages here
      </div>
    );
  }
})