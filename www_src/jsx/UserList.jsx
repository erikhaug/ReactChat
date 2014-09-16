var UserList = React.createClass({
  sendPoke: function(e){
    var id = e.target.dataset['id'];
    
    emit('pokeUser', id);
  },
  render: function() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          Users
        </div>
        <ul className="list-group">
        {this.props.users.map(user =>
          <li className="list-group-item clickable" key={user.id} data-id={user.id} onClick={this.sendPoke}>
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