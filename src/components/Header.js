import React, { Component } from 'react';
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
import { AppBar, IconButton, MenuItem, Drawer } from 'material-ui';

import { logoutUser } from '../actions/auth';
import { toggleDrawer } from '../actions/drawer';



class Header extends Component {
  fullLogout() {
    this.props.toggleDrawer(false);
    this.props.logoutUser();
  }

  renderRightIcon() {
    const { creatingProjects, fetchingProjects, savingProject, fetchingProject } = this.props;

    if (creatingProjects || fetchingProjects || savingProject || fetchingProject) {
      return (<IconButton><LoopIcon /></IconButton>);
    }
    return (<IconButton />);
  }

  render() {
    const { authenticated, t, isOpen, toggleDrawer } = this.props;
    return (
      <div>
        <AppBar title={t('NAVBAR.title')}
          iconElementRight={this.renderRightIcon()}
          iconElementLeft={
            <IconButton onClick={toggleDrawer.bind(null, true)}>
              <ReorderIcon />
            </IconButton>
          }/>
        <Drawer open={isOpen && authenticated}>
          <IconButton onClick={toggleDrawer.bind(null, false)}><ClearIcon /></IconButton>
          <MenuItem primaryText={t('NAVBAR.projects')}
            leftIcon={<BookIcon />}
            onClick={toggleDrawer.bind(null, false)}
            containerElement={<Link to="/projects"/>} />
          <MenuItem primaryText={t('NAVBAR.clients')}
            leftIcon={<SettingsRemoteIcon />}
            onClick={toggleDrawer.bind(null, false)}
            containerElement={<Link to="/clients"/>} />
          <MenuItem primaryText={t('NAVBAR.settings')}
            leftIcon={<SettingsIcon />}
            onClick={toggleDrawer.bind(null, false)}
            containerElement={<Link to="/settings"/>} />
          <MenuItem primaryText={t('NAVBAR.logout')}
            leftIcon={<CancelIcon />}
            onClick={this.fullLogout.bind(this)} />
        </Drawer>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  authenticated: state.auth.authenticated,
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

