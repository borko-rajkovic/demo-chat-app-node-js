export default socket => store => next => action => {
  console.group(action.type);
  console.log('Action sent to remote', action.meta);
  console.groupEnd(action.type);
  if (action.meta && action.meta.remote) {
      socket.emit('action', action);
  }
  return next(action);
}
