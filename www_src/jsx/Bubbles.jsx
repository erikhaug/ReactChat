var Bubbles =  React.createClass({
  running : false,
  start : function () {
      if (!this.running) {
        this.running = true;
        setTimeout(function () {
          this.stop();
        }.bind(this), 10000);
        this.forceUpdate();
      }
  },
  stop : function () {
    this.running = false;
    this.forceUpdate();
  },
  render : function () {
    if (this.running) {
      return (
        <div id="bubbles">
            <div className="bubble x1"></div>
            <div className="bubble x2"></div>
            <div className="bubble x3"></div>
            <div className="bubble x4"></div>
            <div className="bubble x5"></div>
      </div>              
      )
    } else {
      return (
        <div></div>
        )
    }
  }
});


