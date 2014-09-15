var UserPanel = React.createClass({
    
    render: function() {
        return (
    		<div className="UserPanel">
    			{this.props.allUsers.map(user =>  
                    <span className="username"> {user} </span>
                )}  
			</div>
        	);
    }
});