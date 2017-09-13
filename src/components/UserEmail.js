import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import { TextField } from 'material-ui';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { get, set, isEmpty, isUndefined } from 'lodash';

import { updateUser } from '../actions/user';

class UserEmail extends Component {
  constructor(props) {
    super(props);

    this.state = { email: '' };
  }


  componentWillReceiveProps(newProps) {
    this.setState({ email: get(newProps, 'user.email', '') });
  }

  updateEmail() {
    if (!isEmpty(this.state.email) && !isUndefined(this.props.user)) {
      this.props.updateUser(this.props.token, this.props.user._id, { email: this.state.email });
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
        <Grid item xs>
          <TextField
            label={t('USER.fieldEmail')}
            onChange={this.updateValue()}
            value={this.state.email}
            type="text" />
        </Grid>
        <Grid item xs>
          <Button raised
            onClick={this.updateEmail.bind(this)}>
            {t('PROJECT.validate')}
          </Button>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.item,
  token: state.auth.token
});

const mapDispatchToProps = {
  updateUser
};


export default connect(mapStateToProps, mapDispatchToProps)(translate()(UserEmail));





