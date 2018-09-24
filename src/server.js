import Server from 'socket.io';

export default function startServer(store) {
  const io = new Server(9090);

  store.subscribe(() => io.emit('state', store.getState()));

  let i = 0;

  function onAction(action) {
    console.log(`Action ${i++} received`);
    store.dispatch.bind(store)(action);
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

  io.on('connection', socket => {
    onConnect(socket);
    socket.on('action', onAction);
    socket.on('disconnect', onDisconnect(socket));
  });
}
