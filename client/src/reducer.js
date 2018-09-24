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
      socketId: null,
      name: null,
      users: [],
      sockets: []
    };
  }

  getTypeHandlers() {
    return {
      SET_USERS: this.onSetUsers,
      GET_ARTICLES_FULFILLED: this.onArticlesRetrieved,
      GET_ARTICLES_REJECTED: this.onArticlesRejected,
      INIT_ARTICLES: this.onInitArticles
    };
  }

  onSetUsers(state, payload) {
    const usersForInsert = payload.filter(
      user =>
        user.disconnected === false ||
        _.find(state.users, { socketId: user.socketId })
    );
    return {
      ...state,
      users: usersForInsert
    };
  }
}

export default UserReducer.getInstance();
