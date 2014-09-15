var NameForm = React.createClass({
  submit: function (e) {
    e.preventDefault();
    var author = this.refs.author.getDOMNode().value.trim();
    if (!author) {
      return;
    };
    emit('newUser', {name : author});
  },
  render: function() {
    return (
      <div className="jumbotron">
        <form className="form">
          <div className="input-group">
            <input  type="text" placeholder="Your name" className="form-control" ref="author" autoFocus></input>
            <span className="input-group-btn">
              <button onClick={this.submit} className="btn btn-success">Start</button>
            </span>
          </div>
        </form>
      </div>
    );
  }
});