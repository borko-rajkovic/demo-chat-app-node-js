export function setUsers(state) {
  return {
    type: 'SET_USERS',
    payload: state
  };
}

export function setTyping(payload) {
  return {
    type: 'SET_TYPING',
    payload
  };
}

export function receiveMessage(payload) {
  return {
    type: 'RECEIVE_MESSAGE',
    payload
  };
}
