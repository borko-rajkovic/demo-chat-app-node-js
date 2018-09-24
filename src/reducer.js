import _ from 'lodash';

import Reducer from './reducer-template';

class ArticlesReducer extends Reducer {
  /* State should contain:

users: [
	{
	userId: 'id',
	userName: 'name',
	disconnected: false,
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
	},
	...
]

 */

  getInitialState() {
    return [];
  }

  getTypeHandlers() {
    return {
      USER_CONNECT: this.onUserConnect,
      USER_DISCONNECT: this.onUserDisconnect,
      USER_CHANGE_NAME: this.onUserChangeName
    };
  }

  onUserConnect(state, payload) {
    return [
      ...state,
      {
        socketId: payload.socketId,
        name: payload.socketId,
        disconnected: false
      }
    ];
  }

  onUserDisconnect(state, payload) {
    return state.map(item => {
      if (item.socketId != payload.socketId) {
        return item;
      }
      return _.extend({}, item, { disconnected: true });
    });
  }

  onUserChangeName(state, payload) {
    return state.map(item => {
      if (item.socketId != payload.socketId) {
        return item;
      }

      return _.extend({}, item, { name: payload.name });
    });
  }
}

export default ArticlesReducer.getInstance();
