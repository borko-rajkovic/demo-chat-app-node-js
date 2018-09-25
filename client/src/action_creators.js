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

export function initUser(payload){
  return {
    type: 'INIT_USER',
    payload
  }
}

export function setEditName(payload){
  return {
    type: 'SET_EDIT_NAME',
    payload
  }
}

export function selectSocket(payload){
  return {
    type: 'SOCKET_SELECTED',
    payload
  }
}

export function onTyping(payload){
  return {
    type: 'ON_TYPING',
    payload
  }
}

export function togglePeek(payload){
  return {
    type: 'TOGGLE_PEEK',
    payload
  }
}
