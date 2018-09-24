import Server from 'socket.io';

export default function startServer(store) {
  const io = new Server(9090);

  store.subscribe(() => io.emit('users', store.getState()));

  let i = 0;

  function onChangeName(payload) {
    store.dispatch.bind(store)({
      type: 'USER_CHANGE_NAME',
      payload
    });
  }

  function onConnect(socket) {
    store.dispatch.bind(store)({
      type: 'USER_CONNECT',
      payload: { socketId: socket.id }
    });
  }

  function onDisconnect(socket) {
    return function() {
      store.dispatch.bind(store)({
        type: 'USER_DISCONNECT',
        payload: { socketId: socket.id }
      });
    };
  }

  function onTyping(socket) {
    return function(payload) {
      console.log('payload', payload);
      console.log('socketId', socket.id);
      io.to(`${payload.to}`).emit('typing', {value: payload.value, from: socket.id});
    };
  }

  io.on('connection', socket => {
    onConnect(socket);
    socket.on('change-name', onChangeName);
    socket.on('disconnect', onDisconnect(socket));
    socket.on('typing', onTyping(socket));
  });
}
