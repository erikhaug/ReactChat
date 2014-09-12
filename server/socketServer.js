module.exports = function(command){
 

};

function pipeSocketToCommand(socket, name, command){
  socket.on(name, function(data){
    command(name, data);
  });
}
