var Message = React.createClass({
  render : function () {
    return (
      <div className="list-group-item">
        <h4 className="list-group-item-heading">
          {this.props.message}
        </h4>
        <strong className="list-group-item-text">
          {this.props.username}
        </strong>
        &nbsp;&bull;&nbsp;
        <span className="list-group-item-text text-muted">
          <PrettyTime value={this.props.timestamp} />
        </span>
      </div>
    );
  }
})