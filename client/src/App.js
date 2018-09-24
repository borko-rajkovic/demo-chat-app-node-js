import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro mt-5">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;


//TODO on connect, set socket id
//TODO on change name, emit
//TODO on receive initial data, set list of sockets
//TODO on choose socket, update in store choosed socket
//TODO on typing, emit typing
//TODO on ENTER, emit enter and update messages
//TODO on received messages update messages to socket that send message

/*
{
	socketId: 'id',
	name: 'name',
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
