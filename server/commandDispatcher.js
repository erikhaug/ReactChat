var Q = require('q');

module.exports = function(){
  
  var commandQ = [];
  
  var commands = {};
  
  function handleCommand(name, data){
    var handlers = commands[name];
    if(handlers){
      return Q.allSettled(handlers.map(function(handler){
        return handler(data);
      })).then(function(results){
        return results.every(function(result){
          return result.state === "fulfilled";
        });
      });
    }else{
      return Q(true);
    }
  }
  
  var commandCompleted = commandQ.shift.bind(commandQ);
  
  return {
    
    command: function(name, data){
      if(commandQ.length == 0){
        promiseWhile(function(){
          return commandQ.length > 0;
        }, function(){
          return handleCommand(commandQ[0].name, commandQ[0].data)
          .catch(function(error){
            console.error(error);
          })
          .fin(commandCompleted);
        });
      }
      
      commandQ.push({name: name, data: data});
    },
    
    on: function(name, handler){
      var handlers = commands[name];
      if(handlers){
        if(handlers.indexOf(handler) === -1){
          handlers.push(handler);
        }
      }else{
        commands[name] = [handler];
      }
    },
    
    off: function(name, handler){
      var handlers = commands[name];
      if(handlers){
        var index = handlers.indexOf(handler);
        if(index !== -1){
          handlers.splice(index, 1);
        }
      }
    }
    
  };
  
};
    
    
    
var promiseWhile = function(condition, action) {
  var resolver = Q.defer();

  var loop = function() {
    if (!condition()) return resolver.resolve();
    return action()
      .then(loop)
      .catch(resolver.reject);
  };

  process.nextTick(loop);

  return resolver.promise;
};