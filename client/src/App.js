import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {
  initUser,
  setEditName,
  selectSocket,
  onTyping,
  togglePeek,
  sentMessage
} from './action_creators';
import { connect } from 'react-redux';
import classNames from 'classnames';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: true
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
    this.props.dispatch(setEditName(''));
  }

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
      this.setState({ modal: false });
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

  onChangeMessage(e) {
    this.props.socket.emit('typing', {
      value: e.target.value,
      to: this.props.socketSelected
    });
    this.props.dispatch(
      onTyping({ value: e.target.value, to: this.props.socketSelected })
    );
  }

  sendMessage() {
    this.props.socket.emit('message', {
      value: this.props.currentTyping,
      to: this.props.socketSelected
    });
    this.props.socket.emit('typing', {
      value: '',
      to: this.props.socketSelected
    });
    this.props.dispatch(
      sentMessage({
        value: this.props.currentTyping,
        to: this.props.socketSelected
      })
    );
    this.props.dispatch(onTyping({ value: '', to: this.props.socketSelected }));
  }

  _handleMessageKeyPress = e => {
    if (e.key === 'Enter' && this.props.currentTyping !== '') {
      this.sendMessage();
    }
  };

  _handleSendMessageClick = e => {
    e.preventDefault();
    this.sendMessage();
  };

  render() {
    return (
      <React.Fragment>
        <div>
          <Modal
            isOpen={this.state.modal}
            toggle={this.toggle}
            className={this.props.className}
          >
            <ModalHeader toggle={this.toggle}>Change name</ModalHeader>
            <ModalBody>
              <input
                className="form-control w-100"
                type="text"
                placeholder="Enter name"
                aria-label="Enter name"
                onChange={this.onChangeEditName.bind(this)}
                value={this.props.editName}
                onKeyPress={this._handleEditNameKeyPress.bind(this)}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.toggle}>
                Ok
              </Button>{' '}
            </ModalFooter>
          </Modal>
        </div>
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
                            }
                          )}
                          onClick={this.onClickUser.bind(this, user.socketId)}
                        >
                          <i
                            className={classNames('fa', 'fa-user', 'fa-lg', {
                              'user-active': user.disconnected === false
                            })}
                          />{' '}
                          {user.name}{' '}
                          {_.filter(
                            this.props.messages[user.socketId],
                            function(message) {
                              if (message.unread === true) {
                                return message;
                              }
                            }
                          ).length > 0
                            ? '(' +
                              _.filter(
                                this.props.messages[user.socketId],
                                function(message) {
                                  if (message.unread === true) {
                                    return message;
                                  }
                                }
                              ).length +
                              ')'
                            : ''}
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
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 mb-3">
                <h1
                  className={classNames(
                    'h2',
                    {
                      'font-italic':
                        this.props.socketSelected === null ||
                        this.props.users.find(
                          user => user.socketId === this.props.socketSelected
                        ).disconnected === true
                    },
                    {
                      'text-muted':
                        this.props.socketSelected === null ||
                        this.props.users.find(
                          user => user.socketId === this.props.socketSelected
                        ).disconnected === true
                    }
                  )}
                >
                  {this.props.socketSelected
                    ? this.props.users.find(
                        user => user.socketId === this.props.socketSelected
                      ).name +
                      (this.props.users.find(
                        user => user.socketId === this.props.socketSelected
                      ).disconnected === true
                        ? ' - disconnected'
                        : '')
                    : 'User not selected'}
                </h1>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={this.props.peekTyping}
                    onChange={() => this.props.dispatch(togglePeek())}
                  />
                  <label className="form-check-label" htmlFor="defaultCheck1">
                    Peek typing
                  </label>
                </div>
              </div>
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center mb-3 border-bottom">
                {this.props.socketSelected !== null &&
                this.props.receivedTypings[this.props.socketSelected] &&
                this.props.peekTyping === true ? (
                  <h2 className={classNames('h5', 'font-italic', 'text-muted')}>
                    {this.props.users.find(
                      user => user.socketId === this.props.socketSelected
                    ).name +
                      ' is typing: ' +
                      this.props.receivedTypings[this.props.socketSelected]}
                  </h2>
                ) : null}
              </div>
              {!this.props.socketSelected ? null : (
                <div className="main_section">
                  <div className="container">
                    <div className="chat_container">
                      <div className="col-sm-9 message_section">
                        <div className="row">
                          <div className="new_message_head">
                            <div className="pull-left" />
                            <div className="pull-right" />
                          </div>
                          <div className="chat_area">
                            <ul className="list-unstyled">
                              {this.props.messages[
                                this.props.socketSelected
                              ].map((item, index) => {
                                return item.isSelf === true ? (
                                  <li
                                    className="left clearfix admin_chat"
                                    key={index}
                                  >
                                    <span className="chat-img1 pull-right">
                                      <img
                                        src="http://placehold.it/50/FA6F57/fff&text=ME"
                                        alt="User Avatar"
                                        className="img-circle"
                                      />
                                    </span>
                                    <div className="chat-body1 clearfix">
                                      <p className="mr-2">{item.value}</p>
                                      <div className="chat_time pull-left">
                                        {moment(item.date).fromNow()}
                                      </div>
                                    </div>
                                  </li>
                                ) : (
                                  <li className="left clearfix" key={index}>
                                    <span className="chat-img1 pull-left">
                                      <img
                                        src={`http://placehold.it/50/55C1E7/fff&text=${this.props.users
                                          .find(
                                            user =>
                                              user.socketId ===
                                              this.props.socketSelected
                                          )
                                          .name.substr(0, 1)}`}
                                        alt="User Avatar"
                                        className="img-circle"
                                      />
                                    </span>
                                    <div className="chat-body1 clearfix">
                                      <p className="ml-2">{item.value}</p>
                                      <div className="chat_time pull-right">
                                        {moment(item.date).fromNow()}
                                      </div>
                                    </div>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                          <div className="message_write">
                            <input
                              className="form-control w-100"
                              type="text"
                              placeholder="Enter message"
                              aria-label="Enter message"
                              readOnly={
                                this.props.socketSelected === null ||
                                this.props.users.find(
                                  user =>
                                    user.socketId === this.props.socketSelected
                                ).disconnected === true
                              }
                              onChange={this.onChangeMessage.bind(this)}
                              value={this.props.currentTyping}
                              onKeyPress={this._handleMessageKeyPress.bind(
                                this
                              )}
                            />
                            <div className="clearfix" />
                            <div className="chat_bottom">
                              <a
                                href=""
                                className={classNames(
                                  'pull-right',
                                  'btn',
                                  'btn-success',
                                  {
                                    disabled:
                                      this.props.socketSelected === null ||
                                      this.props.users.find(
                                        user =>
                                          user.socketId ===
                                          this.props.socketSelected
                                      ).disconnected === true
                                  }
                                )}
                                onClick={this._handleSendMessageClick.bind(
                                  this
                                )}
                              >
                                Send
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </main>
          </div>
        </div>
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
    socketSelected: store.socketSelected,
    typings: store.typings,
    currentTyping: store.typings[store.socketSelected] || '',
    receivedTypings: store.receivedTypings,
    peekTyping: store.peekTyping,
    messages: store.messages
  };
})(App);
