var LogoutButton = React.createClass({
  logout: function (e) {
    e.preventDefault();
    localStorage.removeItem('user');
    window.location.reload();
  },
  render: function() {
    return (
      <div className="clearfix">
        <button onClick={this.logout} className="btn btn-danger pull-right">Logg ut</button>
      </div>
    );
  }
});