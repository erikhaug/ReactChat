var ChatForm = React.createClass({
  submit : function  (e) {
    e.preventDefault();
    var author = this.props.author;
    var message = this.refs.message.getDOMNode().value.trim();    
    if (!message) {
      return;
    }
    emit('publishMessage', {name : author, text : message});
    this.refs.message.getDOMNode().value = '';
  },
  render : function () {
    return (
      <form className="form">
        <div className="input-group">
          <input type="text" className="form-control" placeholder="Your message" ref="message" autoFocus></input>
          <span className="input-group-btn">
            <button className="btn btn-success" onClick={this.submit} type="submit">Send</button>
          </span>
        </div>
      </form>
    );
  }
})