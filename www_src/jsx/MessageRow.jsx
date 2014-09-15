var MessageRow = React.createClass({
  render : function () {
    return (
      <div className="list-group-item">
        <h4 className="list-group-item-heading">{this.props.message.text}</h4>
        <strong className="list-group-item-text">{this.props.message.name}</strong>
        &nbsp;&bull;&nbsp;
        <span className="list-group-item-text text-muted">
          <PrettyTime value={this.props.message.timestamp}></PrettyTime>
        </span>
      </div>
    );
  }
})