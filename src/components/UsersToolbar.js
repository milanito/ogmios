import React, { Component } from 'react';
import AddIcon from 'material-ui-icons/Add';
import AppBar from 'material-ui/AppBar';
import Typography from 'material-ui/Typography';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Dialog, { DialogContent, DialogTitle } from 'material-ui/Dialog';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';

import { usersSaving, usersCreating } from '../actions/users';
import {
  projectsToolbarTitleStyle, projectsCreateStyle
} from '../styles/projects';


class UsersToolbar extends Component {
  toggleCreate(openCreate) {
    if (openCreate) {
      this.props.usersCreating();
    } else {
      this.props.usersSaving();
    }
  }

  render() {
    const { t, creating, users } = this.props;
    return (
      <div>
        <AppBar position="static">
          <Toolbar disableGutters>
            <Typography type="title" color="inherit" style={projectsToolbarTitleStyle}>
              {t('USERS.title')}
            </Typography>
            <Typography type="subheading" color="inherit">
              {t('USERS.total')} {users.length}
            </Typography>
            <IconButton color="contrast" onClick={this.toggleCreate.bind(this, true)}>
              <AddIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Dialog
          style={projectsCreateStyle}
          open={creating || false}
          onRequestClose={this.toggleCreate.bind(this, false)}>
          <DialogTitle>{t('USERS.createNew')}</DialogTitle>
          <DialogContent>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  creating: state.users.creating,
  users: state.users.list
});

const mapDispatchToProps = {
  usersSaving,
  usersCreating
};

export default connect(mapStateToProps, mapDispatchToProps)(translate()(UsersToolbar));
