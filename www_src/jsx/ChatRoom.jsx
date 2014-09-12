var ChatRoom = React.createClass({
	submitMessage : function (message) {
		console.log(message);
		emit('publishMessage', message);
	},
	render : function () {
		return (
			<div>
				<header className="page-header">
					<h1>{this.props.title}</h1>
				</header>
				<div id="MessageBoard" className="MessageBoard">

				</div>
				<div >
					<ChatForm onSubmit={this.submitMessage} />
				</div>
				
			</div>
		
			);
	}
})