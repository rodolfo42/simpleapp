import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from './lib/actions';
import AppMenu from './components/AppMenu';
import PeopleTable from './components/PeopleTable';
import OrdersTable from './components/OrdersTable';
import { Grid } from 'semantic-ui-react';
import { Route } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  static propTypes = {}

  render(props = this.props) {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <Grid stretched container>
          <Grid.Row>
            <Grid.Column width={3}>
              <AppMenu />
            </Grid.Column>
            <Grid.Column width={13}>
              <Route path="/people" component={PeopleTable} />
              <Route path="/orders" component={OrdersTable} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default App;
