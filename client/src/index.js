import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducer';
import io from 'socket.io-client';
import { setUsers, setTyping, receiveMessage, initUser } from './action_creators';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const socket = io(`localhost:9090`);
socket.on('connect', () => store.dispatch(initUser({socket, socketId: socket.id, name: socket.id})));
socket.on('users', state => store.dispatch(setUsers(state)));
socket.on('typing', typing => store.dispatch(setTyping(typing)));
socket.on('message', message => store.dispatch(receiveMessage(message)));

// Test change-name emit
// setTimeout(() => {
//   socket.emit('change-name', {name: 'TEST2222', socketId: socket.id});
// }, 100);

// Test users in state
// setInterval(()=>{
//   console.log(store.getState().users);
// }, 2000)

// Test emit typing
// setTimeout(() => {
//   const users = store.getState().users;
//   const currentUser = users.find(el => el.socketId === socket.id);
//   const otherUser = users.find(
//     el => el.socketId !== socket.id && el.disconnected === false
//   );
//   console.log('all users', users);
//   console.log('current user', currentUser);
//   socket.emit('typing', {value: `from ${currentUser.socketId} to ${otherUser.socketId}`, to: otherUser.socketId});
// }, 2000);

// Test emit message ENTER
// setTimeout(() => {
//   const users = store.getState().users;
//   const currentUser = users.find(el => el.socketId === socket.id);
//   const otherUser = users.find(
//     el => el.socketId !== socket.id && el.disconnected === false
//   );
//   console.log('all users', users);
//   console.log('current user', currentUser);
//   socket.emit('message', {value: `from ${currentUser.socketId} to ${otherUser.socketId}`, to: otherUser.socketId});
// }, 2000);



const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware())
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
