import React, { Component } from 'react';
import AppMenu from './components/AppMenu';
import itemsTable from './components/PeopleTable';
import { Grid } from 'semantic-ui-react';
import { Route } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';

const PeopleTable = itemsTable('people');
const OrdersTable = itemsTable('orders');

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
