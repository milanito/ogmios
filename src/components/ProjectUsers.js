import React, { Component } from 'react';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import List from 'material-ui/List';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { map, isEqual, first, upperCase } from 'lodash';

import UserCard from './UserCard';

class ProjectUsers extends Component {
  handleDelete(user) {
  }

  changeRole(user) {
  }

  render() {
    const { users, t, project } = this.props;
    return (
      <Grid container direction="column">
        <Grid item xs>
          <Typography type="subheading">
            {t('PROJECT.usersList')}
          </Typography>
        </Grid>
        <Grid item xs>
          <List>
            {map(users, (user, i) => <UserCard user={user} key={user._id} project={project} />)}
          </List>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  project: state.project.item,
  users: state.users.list,
});

const mapDispatchToProps = {
};


export default connect(mapStateToProps, mapDispatchToProps)(translate()(ProjectUsers));



