var Header = React.createClass({
	submitMessage : function (message) {
		console.log(message);
		
	},
	render : function () {
		return (
			<div>				
				<header className="page-header">
					<h1>{this.props.title}</h1>
				</header>		
				
			</div>
		
			);
	}
})