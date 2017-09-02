import React, { Component } from 'react';
import ReorderIcon from 'material-ui-icons/Reorder';
import ClearIcon from 'material-ui-icons/Clear';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { translate } from 'react-i18next';
import { AppBar, IconButton, MenuItem, Drawer } from 'material-ui';

import { logoutUser } from '../actions/auth';
import { toggleDrawer } from '../actions/drawer';



class Header extends Component {
  render() {
    const { authenticated, t, isOpen, logoutUser, toggleDrawer } = this.props;
    return (
      <div>
        <AppBar title={t('NAVBAR.title')}
          iconElementLeft={<IconButton onClick={toggleDrawer.bind(null, true)}><ReorderIcon /></IconButton>}/>
        <Drawer open={isOpen && authenticated}>
          <IconButton onClick={toggleDrawer.bind(null, false)}><ClearIcon /></IconButton>
          <MenuItem primaryText={t('NAVBAR.projects')} containerElement={<Link to="/projects"/>} />
          <MenuItem primaryText={t('NAVBAR.clients')} containerElement={<Link to="/clients"/>} />
          <MenuItem primaryText={t('NAVBAR.logout')} onClick={logoutUser.bind(null)} />
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

