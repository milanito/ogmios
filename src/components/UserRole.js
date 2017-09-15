import React, { Component } from 'react';
import Menu, { MenuItem } from 'material-ui/Menu';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Grid from 'material-ui/Grid';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { get, isEqual, map } from 'lodash';

import { updateUser } from '../actions/user';
import { updateData } from '../actions/auth';

class UserRole extends Component {
  constructor(props) {
    super(props);

    this.state = { open: false, role: '', anchorEl: null };
  }

  clickList(event) {
    return this.setState({ open: true, anchorEl: event.currentTarget });
  }

  toggleMenu() {
    return this.setState({ open: false });
  }

  componentWillReceiveProps(newProps) {
    this.setState({ role: get(newProps, 'user.role', '') });
    if (!isEqual(this.props.user.role, this.props.role) &&
      isEqual(this.props.user._id, this.props.userid)) {
      this.props.updateData(this.props.token);
    }
  }

  handleChange(role) {
    this.props.updateUser(this.props.token, this.props.user._id,
      { role });
  }

  render() {
    const { t } = this.props;
    const roles = ['admin', 'user'];
    return (
      <Grid container direction="row">
        <Grid item xs>
          <List>
            <ListItem button
              onClick={event => this.clickList(event, true)}>
              <ListItemText primary={t('USER.fieldRole')}
                secondary={this.state.role}/>
            </ListItem>
          </List>
          <Menu
            open={this.state.open}
            anchorEl={this.state.anchorEl}
            onRequestClose={this.toggleMenu.bind(this, true)}>
            {map(roles, (role, i) =>
              <MenuItem
                key={i}
                selected={role === this.state.role}
                onClick={event => this.handleChange(role, true)}>
                {role}
              </MenuItem>
            )}
          </Menu>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.item,
  role: state.auth.role,
  token: state.auth.token,
  userid: state.auth.userid
});

const mapDispatchToProps = {
  updateUser,
  updateData
};


export default connect(mapStateToProps, mapDispatchToProps)(translate()(UserRole));






