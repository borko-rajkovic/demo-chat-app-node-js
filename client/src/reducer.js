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
            'SET_USERS': this.onSetUsers,
            'GET_ARTICLES_FULFILLED': this.onArticlesRetrieved,
            'GET_ARTICLES_REJECTED': this.onArticlesRejected,
            'INIT_ARTICLES': this.onInitArticles
        };
    }

    onSetUsers(state, payload){
        return {
            ...state,
            users: payload
        }
    }

    onArticlesRetrieved(state, payload) {
        return _.extend({}, state, {
            retrieved: true,
            loading: false,
            errored: false,
            topics: payload.data
        });
    }

    onArticlesRejected(state) {
        return _.extend({}, state, {
            retrieved: true,
            loading: false,
            errored: true
        });
    }

    onInitArticles(state) {
        let topics = null;

        if(topics) {
            topics = JSON.parse(topics);
        }

        return _.extend({}, state, {
            retrieved: !!topics,
            loading: false,
            topics: topics
        });
    }
}

export default UserReducer.getInstance();
