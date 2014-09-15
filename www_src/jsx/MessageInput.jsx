var MessageInput = React.createClass({
  submit : function  (e) {
    e.preventDefault();
    var username = this.props.username;
    var message = 'get the message from the input called message';
    if (!message) {
      return;
    }
    //publishMessage to server
    //clear the input element
  },
  render : function () {
    return (
      <form className="form">
        <div className="input-group">
          <input type="text" className="form-control" placeholder="Your message" ref="message" autoFocus></input>
          <span className="input-group-btn">
            <button className="btn btn-success" type="submit">Send</button>
          </span>
        </div>
      </form>
    );
  }
})