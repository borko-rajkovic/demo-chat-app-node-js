import _ from 'lodash';

import Reducer from './reducer-template';

class UserReducer extends Reducer {
  getInitialState() {
    return {
      socket: null,
      socketId: null,
      name: null,
      editName: '',
      socketSelected: null,
      peekTyping: false,
      typings: {},
      receivedTypings: {},
      messages: {},
      users: [],
      sockets: []
    };
  }

  getTypeHandlers() {
    return {
      SET_USERS: this.onSetUsers,
      INIT_USER: this.onInitUser,
      SET_EDIT_NAME: this.onSetEditName,
      SOCKET_SELECTED: this.onSocketSelected,
      ON_TYPING: this.onTyping,
      SET_TYPING: this.onSetTyping,
      TOGGLE_PEEK: this.onTogglePeek,
      SENT_MESSAGE: this.onSentMessage,
      RECEIVE_MESSAGE: this.onReceiveMessage
    };
  }

  onSentMessage(state, payload) {
    return {
      ...state,
      messages: {
        ...state.messages,
        [payload.to]: [
          ...state.messages[payload.to],
          {
            value: payload.value,
            isSelf: true
          }
        ]
      }
    };
  }

  onReceiveMessage(state, payload) {
    return {
      ...state,
      messages: {
        ...state.messages,
        [payload.from]: [
          ...state.messages[payload.from],
          {
            value: payload.value,
            isSelf: false
          }
        ]
      }
    };
  }

  onTogglePeek(state) {
    return {
      ...state,
      peekTyping: !state.peekTyping
    };
  }

  onTyping(state, payload) {
    return {
      ...state,
      typings: {
        ...state.typings,
        [payload.to]: payload.value
      }
    };
  }

  onSetTyping(state, payload) {
    return {
      ...state,
      receivedTypings: {
        ...state.typings,
        [payload.from]: payload.value
      }
    };
  }

  onSocketSelected(state, payload) {
    return {
      ...state,
      socketSelected: payload
    };
  }

  onInitUser(state, payload) {
    return {
      ...state,
      socket: payload.socket,
      socketId: payload.socketId,
      name: payload.name
    };
  }

  onSetEditName(state, payload) {
    return {
      ...state,
      editName: payload
    };
  }

  onSetUsers(state, payload) {
    const usersForInsert = payload.filter(
      user =>
        (user.disconnected === false ||
          _.find(state.users, { socketId: user.socketId })) &&
        user.socketId !== state.socketId
    );
    let messages = {};
    usersForInsert.forEach(user => {
      if (!messages[user.socketId]) {
        messages[user.socketId] = [];
      }
    });
    return {
      ...state,
      users: usersForInsert,
      messages
    };
  }
}

export default UserReducer.getInstance();
