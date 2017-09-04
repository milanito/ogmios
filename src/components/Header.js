import React, { Component } from 'react';
import ReorderIcon from 'material-ui-icons/Reorder';
import HomeIcon from 'material-ui-icons/Home';
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

  render() {
    const { authenticated, t, isOpen, toggleDrawer } = this.props;
    return (
      <div>
        <AppBar title={t('NAVBAR.title')}
          iconElementLeft={<IconButton onClick={toggleDrawer.bind(null, true)}><ReorderIcon /></IconButton>}/>
        <Drawer open={isOpen && authenticated}>
          <IconButton onClick={toggleDrawer.bind(null, false)}><ClearIcon /></IconButton>
          <MenuItem primaryText={t('NAVBAR.home')}
            leftIcon={<HomeIcon />}
            onClick={toggleDrawer.bind(null, false)}
            containerElement={<Link to="/"/>} />
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
  isOpen: state.drawer.isOpen
});

const mapDispatchToProps = {
  logoutUser,
  toggleDrawer
};

export default connect(mapStateToProps, mapDispatchToProps)(translate()(Header));

