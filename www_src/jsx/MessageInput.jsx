var MessageInput = React.createClass({
  submit : function  (e) {
    e.preventDefault();

    var message = this.refs.message.getDOMNode().value.trim();

    if (!message) {
      return;
    }
    this.props.onPublishMessage(message);
    this.refs.message.getDOMNode().value = '';
  },
  render : function () {
    return (
      <form className="form">
        <div className="input-group">
          <input type="text" className="form-control" placeholder="Your message" ref="message" autoFocus></input>
          <span className="input-group-btn">
            <button className="btn btn-success" type="submit" onClick={this.submit}>Send</button>
          </span>
        </div>
      </form>
    );
  }
})