import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { Menu } from 'semantic-ui-react';

const linkTo = (route, name) =>
  (<NavLink className='item' activeClassName='active' to={route}>{name}</NavLink>);

class AppMenu extends Component {
  render() {
    return (
      <Menu secondary vertical>
        {linkTo('/people', 'People')}
        {linkTo('/orders', 'Orders')}
      </Menu>
    );
  }
}

export default AppMenu;
