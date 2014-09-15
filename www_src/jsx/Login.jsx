var Login = React.createClass({
  submit: function (e) {
    e.preventDefault();
    
    var username = 'who are you?';
    
    if (!username) {
      return;
    }
    
    //create user here
  },
  render: function() {
    return (
      <div className="jumbotron">
        <form className="form">
          <div className="input-group">
            <input type="text" placeholder="Your name" className="form-control" autoFocus></input>
            <span className="input-group-btn">
              <button className="btn btn-success" type="submit">Start</button>
            </span>
          </div>
        </form>
      </div>
    );
  }
});