import React, { Component } from 'react';
import List, { ListItem, ListItemIcon, ListItemText, ListSubheader } from 'material-ui/List';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import LoopIcon from 'material-ui-icons/Loop';
import ReorderIcon from 'material-ui-icons/Reorder';
import BookIcon from 'material-ui-icons/Book';
import SettingsIcon from 'material-ui-icons/Settings';
import SettingsRemoteIcon from 'material-ui-icons/SettingsRemote';
import CancelIcon from 'material-ui-icons/Cancel';
import ClearIcon from 'material-ui-icons/Clear';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { translate } from 'react-i18next';
import { isEqual } from 'lodash';

import history from '../history';
import { logoutUser } from '../actions/auth';
import { toggleDrawer } from '../actions/drawer';
import { drawerListStyle } from '../styles/drawer';
import { appbarTitleStyle, emailStyle } from '../styles/main';

class Header extends Component {
  fullLogout() {
    this.props.toggleDrawer(false);
    this.props.logoutUser();
  }

  navigate(url) {
    history.push(url);
  }

  renderRightIcon() {
    const { creatingProjects, fetchingProjects, savingProject, fetchingProject } = this.props;

    if (creatingProjects || fetchingProjects || savingProject || fetchingProject) {
      return (<IconButton><LoopIcon /></IconButton>);
    }
    return (<IconButton />);
  }

  render() {
    const { authenticated, t, isOpen, toggleDrawer, role, email } = this.props;
    return (
      <div>
        <AppBar color="inherit">
          <Toolbar disableGutters>
            <IconButton onClick={toggleDrawer.bind(null, true)}>
              <ReorderIcon />
            </IconButton>
            <Typography type="title" style={appbarTitleStyle}>
              {t('NAVBAR.title')}
            </Typography>
            <Typography type="subheading" style={emailStyle}>
              {email}
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer open={isOpen && authenticated}
          style={drawerListStyle}
          onRequestClose={toggleDrawer.bind(null, false)}
          onClick={toggleDrawer.bind(null, false)}>
          <List
            subheader={<ListSubheader>{t('NAVBAR.drawerTitle')}</ListSubheader>}>
            <ListItem button onClick={this.navigate.bind(this, '/projects')}>
              <ListItemIcon><BookIcon /></ListItemIcon>
              <ListItemText primary={t('NAVBAR.projects')} />
            </ListItem>
            <ListItem button onClick={this.navigate.bind(this, '/clients')}>
              <ListItemIcon><SettingsRemoteIcon /></ListItemIcon>
              <ListItemText primary={t('NAVBAR.clients')} />
            </ListItem>
            {(() => {
              if (isEqual(role, 'admin')) {
                return (
                  <ListItem button onClick={this.navigate.bind(this, '/users')}>
                    <ListItemIcon><SettingsIcon /></ListItemIcon>
                    <ListItemText primary={t('NAVBAR.users')} />
                  </ListItem>
                )
              }
            })()}
            <ListItem button onClick={this.fullLogout.bind(this)}>
              <ListItemIcon><CancelIcon /></ListItemIcon>
              <ListItemText primary={t('NAVBAR.logout')} />
            </ListItem>
          </List>
        </Drawer>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  authenticated: state.auth.authenticated,
  role: state.auth.role,
  email: state.auth.email,
  isOpen: state.drawer.isOpen,
  creatingProject: state.projects.creating,
  fetchingProjects: state.projects.fetching,
  savingProject: state.project.creating,
  fetchingProject: state.project.fetching,
});

const mapDispatchToProps = {
  logoutUser,
  toggleDrawer
};

export default connect(mapStateToProps, mapDispatchToProps)(translate()(Header));

