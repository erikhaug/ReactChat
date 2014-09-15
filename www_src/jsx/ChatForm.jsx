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
      <div className="ChatForm">
        <form className="form-horizontal " role="form">
          <div className="form-group">
            <label htmlFor="inputMessage" className="col-sm-2 control-label" >Message</label>
            <div className="col-sm-10">
                <textarea className="form-control" placeholder="Your message" rows="3" ref="message"></textarea>
            </div>
          </div>

          <div className="form-group ">
            <div className="col-sm-12 btn-group">
              <button onClick={this.submit} className="btn btn-lg btn-success pull-right">Send</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
})