import Server from 'socket.io';

export default function startServer(store) {
  const io = new Server(9090);

  console.log('Server started');

  store.subscribe(
      () => io.emit('state', store.getState())
  );

  let i=0;

  function onAction(action) {
    console.log(`Action ${i++} received`);
    store.dispatch.bind(store)(action);
  }

  function onConnect(socket) {
    console.log(`Socket ${socket.id} connected`);
  }

  function onDisconnect(socket) {
    return function(){
      console.log(`Socket ${socket.id} disconnected`);
    }
  }

  io.on('connection', (socket) => {
    onConnect(socket);
    socket.emit('state', store.getState());
    socket.on(
          'action',
          onAction
      );
    socket.on('disconnect', onDisconnect(socket));
  });
}
