var MessageBoard = React.createClass({
  render : function () {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          Messages
        </div>
        <MessageList messages={this.props.messages} />
        <div className="panel-footer">
          <MessageInput />
        </div>
      </div>
    );
  }
})