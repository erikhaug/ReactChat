var MessageBoard = React.createClass({
  render : function () {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          Messages
        </div>
        put message list here
        <div className="panel-footer">
          <MessageInput />
        </div>
      </div>
    );
  }
})