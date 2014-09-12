var MessageBoard = React.createClass({
	render : function () {
		return (
			<div>
				{this.props.messages.map(message =>  
					<MessageRow message={message} />
				)}		
			</div>
		
			);
	}
})