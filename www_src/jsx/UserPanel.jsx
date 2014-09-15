var UserPanel = React.createClass({
    
  render: function() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          Brukere
        </div>
        <ul className="list-group">
          {this.props.allUsers.map(user =>  
            <li className="list-group-item">{user}</li>
          )}  
        </ul>
        <div className="panel-footer">
          &nbsp;
        </div>
      </div>
    );
  }
});