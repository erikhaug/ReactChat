var MessageRow = React.createClass({
	render : function () {
		return (
			<div className="MessageRow">
				<span className="author">{this.props.message.name} </span>
				<span className="text">  <p>{this.props.message.text}</p></span>
			</div>
		
			);
	}
})