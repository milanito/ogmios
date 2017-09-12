import React, { Component } from 'react';
import Typography from 'material-ui/Typography';
import List from 'material-ui/List';
import Card from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import { connect } from 'react-redux';
import { map } from 'lodash';
import { translate } from 'react-i18next';
import { LinearProgress } from 'material-ui/Progress';

import { fetchAllUsers } from '../actions/users';
import { listStyle, elementStyle } from '../styles/lists';

class Users extends Component {
  componentDidMount() {
    this.props.fetchAllUsers(this.props.token);
  }

  render() {
    const { users } = this.props;
    if (users) {
      return this.renderUsers();
    }
    return (<LinearProgress mode="indeterminate" />)
  }

  renderUsers() {
    const { users, t } = this.props;
    return (
      <Card>
        <List style={listStyle}>
          {map(users, (user) =>(
          <Paper style={elementStyle} key={user.id}>
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


