var UserList = React.createClass({

  render: function() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          Users
        </div>
        <ul className="list-group">
        {this.props.users.map(user =>
          <li className="list-group-item clickable" key={user.id}>
            {user.username}
          </li>
        )}
        </ul>
        <div className="panel-footer">
          <LogoutButton />
        </div>
      </div>
    );
  }
});