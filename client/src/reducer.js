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
      users: [],
      sockets: []
    };
  }

  getTypeHandlers() {
    return {
      SET_USERS: this.onSetUsers,
      INIT_USER: this.onInitUser
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
