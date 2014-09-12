module.exports = function(command){
  
  return function(socket){
    console.log('socketServer');
    command('sendStateToClient', socket);

  }
};

function pipeSocketToCommand(socket, name, command){
  socket.on(name, function(data){
    command(name, data);
  });
}
