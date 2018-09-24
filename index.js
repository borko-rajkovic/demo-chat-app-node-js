import makeStore from './src/store';
import startServer from './src/server';

export const store = makeStore();
startServer(store);

//TODO on connect, insert socket id to list of ids and make name = socket id and emit
//TODO on disconnect, mark socket id as disconnected and emit
//TODO on socket emit change name, change it's name and emit
//TODO on socket emit typing, update typing for that receiver and emit
//TODO on socket emit ENTER, update finished message for that receiver and emit


/*

user list:
[
	{
	userId: 'id',
	userName: 'name',
  disconnected: false,
  ???
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
  ???
	},
	...
]

 */
