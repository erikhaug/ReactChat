var MessageBoard = React.createClass({
  
  render : function () {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3>Messages</h3>
        </div>
        <div id="MessageList">
          
        </div>
        <div className="panel-footer">
          <MessageInput onPublishMessage={this.props.onPublishMessage}/>
        </div>
      </div>
    );
  }
})