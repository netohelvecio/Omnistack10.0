import socketio from 'socket.io';
import calculateDistance from './utils/calculateDistance';

let io;
const connections = [];

export function setupWebsocket(server) {
  io = socketio(server);

  io.on('connection', socket => {
    const { latitude, longitude, techs } = socket.handshake.query;

    connections.push({
      id: socket.id,
      coordinates: {
        latitude: Number(latitude),
        longitude: Number(longitude),
      },
      techs: techs.split(',').map(tech => tech.trim().toLowerCase()),
    });
  });
}

export function findConnections(coordinates, techs) {
  return connections.filter(connection => {
    return (
      calculateDistance(coordinates, connection.coordinates) < 15 &&
      connection.techs.some(item => techs.includes(item))
    );
  });
}

export function sendMessage(to, message, data) {
  to.forEach(connection => {
    io.to(connection.id).emit(message, data);
  });
}
