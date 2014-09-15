var Header = React.createClass({
  render : function () {
    return (
      <header className="page-header">
        <h1>{this.props.title}</h1>
      </header>
    );
  }
})