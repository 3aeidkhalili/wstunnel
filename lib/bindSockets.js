//@ sourceMappingURL=bindSockets.map
// Generated by CoffeeScript 1.6.1
(function() {
  var bindSockets;

  module.exports = bindSockets = function(wsconn, tcpconn) {
    wsconn.on('message', function(message) {
      if (message.type === 'utf8') {
        return console.log('Error, Not supposed to received message ');
      } else if (message.type === 'binary') {
        if (!tcpconn.write(message.binaryData)) {
          return 'aha';
        }
      }
    });
    tcpconn.on("data", function(buffer) {
      return wsconn.sendBytes(buffer);
    });
    wsconn.on("error", function(err) {
      return console.log((new Date()) + 'ws Error ' + err);
    });
    tcpconn.on("error", function(err) {
      return console.log((new Date()) + 'tcp Error ' + err);
    });
    wsconn.on('close', function(reasonCode, description) {
      console.log((new Date()) + 'ws Peer ' + wsconn.remoteAddress + ' disconnected.');
      return tcpconn.destroy();
    });
    return tcpconn.on("close", function() {
      console.log((new Date()) + 'tunnel disconnected.');
      return wsconn.close();
    });
  };

}).call(this);