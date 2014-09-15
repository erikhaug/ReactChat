var MessageBoard = React.createClass({
  render : function () {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          Meldinger
        </div>
        <MessageList messages={this.props.messages}></MessageList>
        <div className="panel-footer">
          <ChatForm author={this.props.author}></ChatForm>
        </div>
      </div>
    );
  }
})