import makeStore from './src/store';
import startServer from './src/server';

export const store = makeStore();
startServer(store);

//TODO on disconnect, mark socket id as disconnected and emit
//TODO on socket emit change name, change it's name and emit
//TODO on socket emit typing, update typing for that receiver and emit
//TODO on socket emit ENTER, update finished message for that receiver and emit
