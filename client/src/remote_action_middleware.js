export default socket => store => next => action => {
  if (action.meta && action.meta.remote) {
      console.group(action.type);
      console.log('Action sent to remote', action.meta);
      console.groupEnd(action.type);

      socket.emit('action', action);
  }
  return next(action);
}
