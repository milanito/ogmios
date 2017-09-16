import React, { Component } from 'react';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import List from 'material-ui/List';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { map } from 'lodash';

import UserCard from './UserCard';
import AddUserProjectForm from './AddUserProjectForm';
import { canAddUserToProject } from '../utils';

class ProjectUsers extends Component {
  render() {
    const { users, t, project, userid, role } = this.props;
    return (
      <Grid container direction="column">
        <Grid item xs>
          <Typography type="subheading">
            {t('PROJECT.usersList')}
          </Typography>
        </Grid>
        <Grid item xs>
          {canAddUserToProject(userid, role, project) && <AddUserProjectForm />}
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
  users: state.project.users,
  role: state.auth.role,
  userid: state.auth.userid,
});

const mapDispatchToProps = {
};


export default connect(mapStateToProps, mapDispatchToProps)(translate()(ProjectUsers));



