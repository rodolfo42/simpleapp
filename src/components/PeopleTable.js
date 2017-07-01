import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Flag from 'react-world-flags'
import {
  Table,
  Container,
  Input,
  Header,
  Image,
  Icon,
  Message,
  Grid
} from 'semantic-ui-react';
import * as actions from '../lib/actions';
import { withRouter } from 'react-router-dom';

class PeopleTable extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    filterPeople: PropTypes.func.isRequired,
    term: PropTypes.string,
    allPeople: PropTypes.array.isRequired,
    clearFilter: PropTypes.func.isRequired,
    error: PropTypes.any
  }

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

  renderError(error = this.props.error) {
    return (
      <Message error>
        <Message.Header>Unexpected error</Message.Header>
        <p>Message: {error.message}</p>
      </Message>
    );
  }

  renderPeopleTable(props = this.props) {
    if (props.error) {
      return this.renderError(props.error);
    } else if (!props.loading) {
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

  renderResults(props = this.props) {
    const { filtered, allPeople } = props;
    if (filtered && allPeople.length > 0) {
      return (
        <div>
          <strong>{allPeople.length}</strong> results
        </div>
      );
    }
  }

  render(props = this.props) {
    let searchIcon;
    if (props.term) {
      searchIcon = <Icon name='remove' link onClick={props.clearFilter} />
    } else {
      searchIcon = <Icon name='search' />
    }

    return (
      <div>
      <Grid>
        <Grid.Row columns={2}>
          <Grid.Column textAlign='left'>
            <Header as="h1">Find people</Header>
            <Input
              value={props.term}
              icon={searchIcon}
              loading={props.loading}
              placeholder='Search by name, e-mail'
              onChange={props.filterPeople} />
          </Grid.Column>
          <Grid.Column textAlign='right' verticalAlign='bottom'>
            {this.renderResults()}
          </Grid.Column>
        </Grid.Row>
      </Grid>
      {this.renderPeopleTable()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state.people;
}

const mapDispatchToProps = (dispatch) => {
  return {
    filterPeople: (e, data) => {
      const { value } = data;
      dispatch(actions.filterPeople(value));
    },
    clearFilter: () => {
      dispatch(actions.clearFilter());
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PeopleTable));
