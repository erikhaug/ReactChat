var NameForm = React.createClass({
    submit: function (e) {
    	e.preventDefault();
    	var author = this.refs.author.getDOMNode().value.trim();
        if (!author) {
            return;
        };
    	emit('newUser', {name : author});
    },
    render: function() {
        return (
    		<div className="col-sm-4 NameForm">
    			<form className="form-inline">
			  		<div className="form-group">
					    <input  type="text" placeholder="Your name" className="form-control" ref="author"></input>
					    <button onClick={this.submit} className="btn btn-success pull-right">Start</button>
				   </div>
				</form>
			</div>
        	);
    }
});