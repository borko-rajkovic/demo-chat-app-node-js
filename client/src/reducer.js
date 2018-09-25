import _ from 'lodash';

import Reducer from './reducer-template';

class UserReducer extends Reducer {
  /* state
{
	socketId: 'id',
    name: 'name',
    users: [],
	sockets:	[
					{
						socketId: 1234,
            messages: [
							'message1',
							'message2',
							...
						],
            typed: 'something...'
					},
					...
        ]
}
*/

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
      TOGGLE_PEEK: this.onTogglePeek
    };
  }

  onTogglePeek(state){
    return {
      ...state,
      peekTyping: !state.peekTyping
    }
  }

  onTyping(state, payload){
    return {
      ...state,
      typings: {
        ...state.typings,
        [payload.to]: payload.value
      }
    };
  }

  onSetTyping(state, payload){
    return {
      ...state,
      receivedTypings: {
        ...state.typings,
        [payload.from]: payload.value
      }
    };
  }

  onSocketSelected(state, payload){
    return {
      ...state,
      socketSelected: payload
    }
  }

  onInitUser(state, payload) {
    return {
      ...state,
      socket: payload.socket,
      socketId: payload.socketId,
      name: payload.name
    };
  }

  onSetEditName(state, payload){
    return {
      ...state,
      editName: payload
    }
  }

  onSetUsers(state, payload) {
    const usersForInsert = payload.filter(
      user =>
        (user.disconnected === false ||
        _.find(state.users, { socketId: user.socketId }))&&user.socketId!==state.socketId
    );
    return {
      ...state,
      users: usersForInsert
    };
  }
}

export default UserReducer.getInstance();
