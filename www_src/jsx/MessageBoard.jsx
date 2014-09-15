var MessageBoard = React.createClass({
	render : function () {
		return (
			<div className="MessageBoard">
				{this.props.messages.map(message =>  
					<MessageRow message={message} />
				)}	
			</div>
		
			);
	}
})