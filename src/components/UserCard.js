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
import { last, split, isEqual } from 'lodash';

import { canDeleteUser } from '../utils';
import { projectUsersRemove, projectUsersUpdate } from '../actions/project';
import { usersRemove } from '../actions/users';

class UserCard extends Component {
  redirectToUser(id) {
    const { user, project, token } = this.props;
    if (!project) {
      this.props.history.push(`/user/${user._id}`);
    } else {
      if (!isEqual(user.role, 'owner')) {
        this.props.projectUsersUpdate(token, project._id, user._id,
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
    const { user, usersRemove, projectUsersRemove, token, project } = this.props;
    if (project) {
      projectUsersRemove(token, project._id, user._id);
    } else {
      usersRemove(token, user._id);
    }
  }

  renderDelete() {
    if (canDeleteUser(this.props.userid, this.props.role, this.props.user)) {
      return (
        <ListItemSecondaryAction>
          <IconButton
            onClick={this.remove.bind(this)}>
            <Clear />
          </IconButton>
        </ListItemSecondaryAction>
      )
    }
    return (<div></div>)
  }

  render() {
    const { user } = this.props;
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


