import makeStore from './src/store';
import startServer from './src/server';

export const store = makeStore();
startServer(store);

//TODO on socket emit ENTER, update finished message for that receiver and emit
