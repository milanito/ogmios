import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import { TextField } from 'material-ui';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { get, set, isEmpty, isUndefined, isEqual } from 'lodash';

import { updateUser } from '../actions/user';
import { updateData } from '../actions/auth';

class UserRole extends Component {
  constructor(props) {
    super(props);

    this.state = { role: '' };
  }


  componentWillReceiveProps(newProps) {
    this.setState({ role: get(newProps, 'user.role', '') });
    if (!isEqual(this.props.user.role, this.props.role) &&
      isEqual(this.props.user._id, this.props.userid)) {
      this.props.updateData(this.props.token);
    }
  }

  updateRole() {
    if (!isEmpty(this.state.role) && !isUndefined(this.props.user)) {
      this.props.updateUser(this.props.token, this.props.user._id,
        { role: this.state.role });
    }
  }

  updateValue() {
    return (event) => {
      this.setState(set({}, 'role', event.target.value));
    };
  }

  render() {
    const { t } = this.props;
    return (
      <Grid container direction="row">
        <Grid item xs>
          <TextField
            label={t('USER.fieldRole')}
            onChange={this.updateValue()}
            value={this.state.role}
            type="text" />
        </Grid>
        <Grid item xs>
          <Button raised
            onClick={this.updateRole.bind(this)}>
            {t('USER.validate')}
          </Button>
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






