import Server from 'socket.io';

export default function startServer(store) {
  const io = new Server(9090);

  console.log('Server started');

  store.subscribe(
      () => io.emit('state', store.getState().toJS())
  );

  let i=0;

  function onAction(action) {
    console.log(`Action ${i++} received`);
    store.dispatch.bind(store)(action);
  }

  function onConnect(socket) {
    console.log(`Socket ${socket} connected`);
  }

  function onDisconnect(socket) {
    console.log(`Socket ${socket} disconnected`);
  }

  io.on('connection', (socket) => {
    onConnect(socket);
    socket.emit('state', store.getState().toJS());
    socket.on(
          'action',
          onAction
      );
    socket.on('disconnect', onDisconnect(socket));
  });
}
