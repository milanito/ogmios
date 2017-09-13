import React, { Component } from 'react';
import Flag from 'react-country-flag';
import Clear from 'material-ui-icons/Clear';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import { ListItem, ListItemSecondaryAction } from 'material-ui/List';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import { map, last, split, isEqual } from 'lodash';

import { projectCardStyle } from '../styles/project';
import { canDeleteUser } from '../utils';
import {
  usersRemove, projectUsersRemove, projectUsersUpdate
} from '../actions/users';

class UserCard extends Component {
  redirectToUser(id) {
    const { user, project, token } = this.props;
    if (!project) {
      this.props.history.push(`/user/${user._id}`);
    } else {
      if (!isEqual(user.role, 'owner')) {
        this.props.projectUsersUpdate(token, user._id, project._id,
          isEqual(user.role, 'normal') ? 'editor' : 'normal');
      }
    }
  }

  renderLocale(locale, ks) {
    return (
      <Grid item key={locale.code}>
        <Flag code={last(split(locale.code, '_'))} svg />
      </Grid>
    )
  }

  remove() {
    const { user, usersRemove, projectUserRemove, token, project } = this.props;
    if (project) {
      projectUserRemove(token, user._id, project._id);
    } else {
      usersRemove(token, user._id);
    }
  }

  renderDelete() {
    const { user, usersRemove, t, token, role } = this.props;

    if (canDeleteUser(this.props.userid, this.props.role, this.props.user)) {
      return (
        <ListItemSecondaryAction>
          <IconButton
            onClick={usersRemove.bind(this, token, user._id)}>
            <Clear />
          </IconButton>
        </ListItemSecondaryAction>
      )
    }
    return (<div></div>)
  }

  render() {
    const { user, usersRemove, t, token } = this.props;
    return (
        <ListItem button
          onClick={this.redirectToUser.bind(this, user._id)} >
          <Grid container direction="column">
            <Grid item xs>
              <Typography type="title">{user.email}</Typography>
            </Grid>
            <Divider />
            <Grid item xs>
              <Typography type="subheading">{user.role}</Typography>
            </Grid>
          </Grid>
          {this.renderDelete()}
        </ListItem>
    )
  }
}

const mapStateToProps = (state) => ({
  token: state.auth.token,
  role: state.auth.role,
  userid: state.auth.userid,
});

const mapDispatchToProps = {
  usersRemove,
  projectUsersRemove,
  projectUsersUpdate
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(translate()(UserCard)));


