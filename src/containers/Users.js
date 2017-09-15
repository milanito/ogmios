import React, { Component } from 'react';
import List from 'material-ui/List';
import Card from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import { connect } from 'react-redux';
import { map } from 'lodash';
import { translate } from 'react-i18next';
import { LinearProgress } from 'material-ui/Progress';

import UsersToolbar from '../components/UsersToolbar';
import UserCard from '../components/UserCard';
import { fetchAllUsers } from '../actions/users';
import { listStyle, elementStyle } from '../styles/lists';

class Users extends Component {
  constructor(props) {
    super(props);

    this.state = { fetched: false };
  }

  componentWillReceiveProps(newProps) {
    const { token } = newProps;
    if (token && !this.state.fetched) {
      this.setState({ fetched: true });
      this.props.fetchAllUsers(token);
    }
  }

  render() {
    const { users } = this.props;
    if (users) {
      return this.renderUsers();
    }
    return (<LinearProgress mode="indeterminate" />)
  }

  renderUsers() {
    const { users } = this.props;
    return (
      <Card>
        <UsersToolbar />
        <List style={listStyle}>
          {map(users, (user) =>(
          <Paper style={elementStyle} key={user._id}>
            <UserCard user={user} />
          </Paper>
          ))}
        </List>
      </Card>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.users.list,
  token: state.auth.token
});

const mapDispatchToProps = {
  fetchAllUsers,
};


export default connect(mapStateToProps, mapDispatchToProps)(translate()(Users));


