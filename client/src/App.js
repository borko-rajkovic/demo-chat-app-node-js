import React, { Component } from 'react';
import { initUser, setEditName, selectSocket } from './action_creators';
import { connect } from 'react-redux';
import classNames from 'classnames';
import './App.css';

class App extends Component {
  changeName() {
    if (this.props.editName) {
      this.props.socket.emit('change-name', {
        name: this.props.editName,
        socketId: this.props.socket.id
      });
      this.props.dispatch(
        initUser({
          socket: this.props.socket,
          socketId: this.props.socket.id,
          name: this.props.editName
        })
      );
      this.props.dispatch(setEditName(''));
    }
  }

  onChangeEditName(e) {
    this.props.dispatch(setEditName(e.target.value));
  }

  _handleEditNameKeyPress = e => {
    if (e.key === 'Enter') {
      this.changeName();
    }
  };

  _handleChangeNameClick = e => {
    e.preventDefault();
    this.changeName();
  };

  onClickUser(socketId) {
    this.props.dispatch(selectSocket(socketId));
  }

  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <div className="navbar-brand col-sm-3 col-md-2 mr-0" href="">
            {this.props.name}
          </div>
          <input
            className="form-control form-control-dark w-100"
            type="text"
            placeholder="Enter name"
            aria-label="Enter name"
            onChange={this.onChangeEditName.bind(this)}
            value={this.props.editName}
            onKeyPress={this._handleEditNameKeyPress.bind(this)}
          />
          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap">
              <a
                className="nav-link"
                onClick={this._handleChangeNameClick.bind(this)}
                href=""
              >
                Change name
              </a>
            </li>
          </ul>
        </nav>
        <div className="container-fluid">
          <div className="row">
            <nav className="col-md-2 d-none d-md-block bg-light sidebar">
              <div className="sidebar-sticky">
                <ul className="nav flex-column">
                  {this.props.users.map((user, index) => {
                    return (
                      <li key={index} className="nav-item">
                        <button
                          className={classNames(
                            'btn',
                            'btn-block',
                            'btn-light',
                            'p1',
                            'text-left',
                            {
                              active:
                                user.socketId === this.props.socketSelected
                            },
                            { disabled: user.disconnected === true }
                          )}
                          onClick={this.onClickUser.bind(this, user.socketId)}
                        >
                          <i className="fa fa-user fa-lg" /> {user.name}{' '}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </nav>

            <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
              <div
                className="chartjs-size-monitor"
                style={{
                  position: 'absolute',
                  left: '0px',
                  top: '0px',
                  right: '0px',
                  bottom: '0px',
                  overflow: 'hidden',
                  pointerEvents: 'none',
                  visibility: 'hidden',
                  zIndex: '-1'
                }}
              >
                <div
                  className="chartjs-size-monitor-expand"
                  style={{
                    position: 'absolute',
                    left: '0px',
                    top: '0px',
                    right: '0px',
                    bottom: '0px',
                    overflow: 'hidden',
                    pointerEvents: 'none',
                    visibility: 'hidden',
                    zIndex: '-1'
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      width: '1000000px',
                      height: '1000000px',
                      left: 0,
                      top: 0
                    }}
                  />
                </div>
                <div
                  className="chartjs-size-monitor-shrink"
                  style={{
                    position: 'absolute',
                    left: '0px',
                    top: '0px',
                    right: '0px',
                    bottom: '0px',
                    overflow: 'hidden',
                    pointerEvents: 'none',
                    visibility: 'hidden',
                    zIndex: '-1'
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      width: '200%',
                      height: '200%',
                      left: 0,
                      top: 0
                    }}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1
                  className={classNames(
                    'h2',
                    { 'font-italic': this.props.socketSelected === null },
                    { 'text-muted': this.props.socketSelected === null }
                  )}
                >
                  {this.props.socketSelected
                    ? this.props.users.find(
                        user => user.socketId === this.props.socketSelected
                      ).name
                    : 'User not selected'}
                </h1>
              </div>
              <h1 className="h2">Dashboard</h1>
            </main>
          </div>
        </div>

        <footer className="footer p-2">
          <div className="container">
            <div className="row">
              <div className="offset-md-2 col-md-10">
                <input
                  className="form-control w-100"
                  type="text"
                  placeholder="Enter message"
                  aria-label="Enter message"
                />
              </div>
            </div>
          </div>
        </footer>
      </React.Fragment>
    );
  }
}

export default connect(store => {
  return {
    socket: store.socket,
    socketId: store.socketId,
    name: store.name,
    editName: store.editName,
    users: store.users,
    socketSelected: store.socketSelected
  };
})(App);

//TODO on choose socket, update in store choosed socket
//TODO on typing, emit typing
//TODO on ENTER, emit enter and update messages
//TODO on received messages update messages to socket that send message
