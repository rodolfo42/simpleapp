import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from '../App';
import PropTypes from 'prop-types';

class Root extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired
  }

  render(props = this.props) {
    return (
      <Provider store={props.store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );
  }
}

export default Root;
