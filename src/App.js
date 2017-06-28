import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table, Container, Divider, Input, Header, Image, Icon, Message } from 'semantic-ui-react';
import Flag from 'react-world-flags'

import logo from './logo.svg';
import './App.css';

const SEARCH_LATENCY = 250;

class App extends Component {
  static propTypes = {
    allPeople: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    filterPeople: PropTypes.func.isRequired,
    clearFilter: PropTypes.func.isRequired,
    term: PropTypes.string
  };

  renderEmpty(props = this.props) {
    const term = props.term;
    let searchTermComponent = <strong>{term}</strong>;
    if (term.length > 20) {
      searchTermComponent = 'this search term';
    }
    return (
      <Message info>
        <Message.Header>No matches</Message.Header>
        <p>We could not find any matches for {searchTermComponent}. Try another one!</p>
      </Message>
    );
  }

  renderPeopleRows(props = this.props) {
    const people = props.allPeople;
    return people.map((person, key) => {
      const { title, first, last } = person.name;
      const fullName = `${_.upperFirst(title)}. ${_.upperFirst(first)} ${_.upperFirst(last)}`
      return (
        <Table.Row key={key}>
          <Table.Cell>
            <Header as='h4' image>
              <Image src={person.picture.medium} shape='circular' size='medium' />
              <Header.Content>
                {fullName}
                <Header.Subheader>{person.email}</Header.Subheader>
              </Header.Content>
            </Header>
          </Table.Cell>
          <Table.Cell width='1'>
            <Flag className='ui mini image' code={person.nat} />
          </Table.Cell>
        </Table.Row>
      );
    });
  }

  renderPeopleTable(props = this.props) {
    if (!props.loading) {
      const people = props.allPeople;
      if (_.isEmpty(people)) {
        return this.renderEmpty(props);
      } else {
        return (
          <Table celled>
            <Table.Body>
              {this.renderPeopleRows(props)}
            </Table.Body>
          </Table>
        );
      }
    }
  }

  render(props = this.props) {
    let searchIcon;
    if (props.filtered) {
      searchIcon = <Icon name='remove' link onClick={props.clearFilter} />
    } else {
      searchIcon = <Icon name='search' />
    }
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <Container text>
          <Container textAlign="left">
            <Header as="h1">Find people</Header>
            <Input
              value={props.term}
              icon={searchIcon}
              loading={props.loading}
              placeholder='Search...'
              onChange={props.filterPeople} />
          </Container>
          {this.renderPeopleTable()}
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state.people;
}

const mapDispatchToProps = (dispatch) => {
  let timeoutId;
  return {
    filterPeople: (e, data) => {
      const term = data.value;
      clearTimeout(timeoutId);
      if (term) {
        dispatch({ type: 'FILTER_PEOPLE', term });
        timeoutId = setTimeout(() => {
          dispatch({ type: 'FILTER_PEOPLE_DONE', term });
        }, SEARCH_LATENCY);
      } else {
        dispatch({ type: 'CLEAR_FILTER' });
      }
    },
    clearFilter: () => {
      dispatch({ type: 'CLEAR_FILTER' });
    }
  }
}

const connectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

export default connectedApp;
