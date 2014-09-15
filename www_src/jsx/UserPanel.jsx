var UserPanel = React.createClass({
    
  render: function() {
    return (
      <ul className="list-group">
        {this.props.allUsers.map(user =>  
          <li className="list-group-item">{user}</li>
        )}  
      </ul>
    );
  }
});