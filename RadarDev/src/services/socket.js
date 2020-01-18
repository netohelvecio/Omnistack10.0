import socketio from 'socket.io-client';

const socket = socketio('http://192.168.0.100:3333', {
  autoConnect: false,
});

function connect(latitude, longitude, techs) {
  socket.io.opts.query = {
    latitude,
    longitude,
    techs,
  };

  socket.connect();
}

function disconnect() {
  if (socket.connect) {
    socket.disconnect();
  }
}

function subscribeToNewDevs(subcribeFunction) {
  socket.on('new-dev', subcribeFunction);
}

export { connect, disconnect, subscribeToNewDevs };
