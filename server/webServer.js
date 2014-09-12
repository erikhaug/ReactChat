var static = require('serve-static');

module.exports = function(command){
  
  return function(app){
    console.log('webserver', __dirname);
    app.get("*", static(__dirname+'/../www'));

  }
};
