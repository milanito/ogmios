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

class UserEmail extends Component {
  constructor(props) {
    super(props);

    this.state = { email: '' };
  }


  componentWillReceiveProps(newProps) {
    this.setState({ email: get(newProps, 'user.email', '') });
    if (!isEqual(this.props.user.email, this.props.email) &&
      isEqual(this.props.user._id, this.props.userid)) {
      this.props.updateData(this.props.token);
    }
  }

  updateEmail() {
    if (!isEmpty(this.state.email) && !isUndefined(this.props.user)) {
      this.props.updateUser(this.props.token, this.props.user._id,
        { email: this.state.email });
    }
  }

  updateValue() {
    return (event) => {
      this.setState(set({}, 'email', event.target.value));
    };
  }
  render() {
    const { t } = this.props;
    return (
      <Grid container direction="row">
        <Grid item xs={10}>
          <TextField fullWidth
            label={t('USER.fieldEmail')}
            onChange={this.updateValue()}
            value={this.state.email}
            type="text" />
        </Grid>
        <Grid item xs>
          <Button raised
            onClick={this.updateEmail.bind(this)}>
            {t('USER.validate')}
          </Button>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.item,
  email: state.auth.email,
  token: state.auth.token,
  userid: state.auth.userid
});

const mapDispatchToProps = {
  updateUser,
  updateData
};


export default connect(mapStateToProps, mapDispatchToProps)(translate()(UserEmail));





