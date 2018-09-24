import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css'
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducer';
import remoteActionMiddleware from './remote_action_middleware';
import io from 'socket.io-client';
import { setUsers } from './action_creators';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const socket = io(`localhost:9090`);
socket.on('users', state =>
  store.dispatch(setUsers(state))
);

setTimeout(() => {
  socket.emit('change-name', {name: 'TEST2222', socketId: socket.id});
}, 100);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  composeEnhancers(
  applyMiddleware(remoteActionMiddleware(socket))
))

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
