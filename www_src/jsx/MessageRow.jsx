var MessageRow = React.createClass({
  render : function () {
    return (
      <div className="MessageRow">
        <span className="author">{this.props.message.name}</span>
        <p className="message">{this.props.message.text}</p>
        <PrettyTime className="timestamp" value={this.props.message.timestamp}></PrettyTime>
      </div>
    );
  }
})