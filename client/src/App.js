import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.refName = React.createRef();
  }

  state = {
    name: 'Name'
  };

  changeName(e) {
    e.preventDefault();
    if (this.refName.current.value) {
      this.setState({ name: this.refName.current.value });
      this.refName.current.value = '';
    }
  }

  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <div className="navbar-brand col-sm-3 col-md-2 mr-0" href="">
            {this.state.name}
          </div>
          <input
            className="form-control form-control-dark w-100"
            type="text"
            placeholder="Enter name"
            aria-label="Enter name"
            ref={this.refName}
          />
          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap">
              <a
                className="nav-link"
                onClick={this.changeName.bind(this)}
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
                  <li className="nav-item">
                    <a className="nav-link active" href="">
                      <i className="fa fa-user fa-lg" /> Dashboard{' '}
                      <span className="sr-only">(current)</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="">
                      <i className="fa fa-user fa-lg" /> Orders
                    </a>
                  </li>
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
                <h1 className="h2">Dashboard</h1>
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
    loading: store.loading
  };
})(App);

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
