var UserList = React.createClass({
  poke: function (e) {
    e.preventDefault();
    var userId = e.target.dataset['id'];
    emit('pokeUser', userId);
  },
  render: function() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3>Users</h3>
        </div>
        <ul className="list-group">
          {this.props.users.map((user, index) =>
          <li className="list-group-item clickable" onClick={this.poke} data-id={user.id}>{user.username}</li>
        )}
        </ul>
        <div className="panel-footer">
          <LogoutButton />
        </div>
      </div>
    );
  }
});