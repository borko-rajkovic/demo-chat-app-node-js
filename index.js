import makeStore from './src/store';
import startServer from './src/server';

export const store = makeStore();
startServer(store);

/**
 * Improval list:
 * 
 * - user login
 * - allow reconnect
 * - timestamps
 * - instead of typing, send characters changed
 * - instead of message sending, commit typing
 */
