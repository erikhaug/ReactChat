var Login = React.createClass({
  submit: function (e) {
    e.preventDefault();
    var username = this.refs.username.getDOMNode().value.trim()
    
    if (!username) {
      return;
    }
    
    emit('newUser',username)
  },
  render: function() {
    return (
      <div className="jumbotron">
        <form className="form">
          <div className="input-group">
            <input type="text" placeholder="Your name" className="form-control" ref="username" autoFocus></input>
            <span className="input-group-btn">
              <button className="btn btn-success" type="submit" onClick={this.submit}>Start</button>
            </span>
          </div>
        </form>
      </div>
    );
  }
});