import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import { TextField } from 'material-ui';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { reduxForm, Field, reset } from 'redux-form';
import {
  isEmpty, isEqual, pick
} from 'lodash';

import { updateUser } from '../actions/user';

const renderField = ({ input, type, label, meta: { touched, error } }) => (
  <TextField fullWidth
    label={label}
    type={type}
    error={touched && !isEmpty(error)}
    helperText={touched && error}
    {...input}
    />
);

class UserPassword extends Component {
  constructor(props) {
    super(props);

    this.state = { password: '' };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(props) {
    this.props.updateUser(this.props.token, this.props.user._id,
      pick(props, ['password']));
  }

  render() {
    const { handleSubmit, t } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit)}>
        <Grid container direction="column" align="center">
          <Grid item xs>
            <Typography type="subheading">
              {t('USER.changePassword')}
            </Typography>
          </Grid>
          <Grid item xs>
            <Field name="password" component={renderField} type="password"
              label={t('USER.fieldPassword')} />
          </Grid>
          <Grid item xs>
            <Field name="passwordConfirm" component={renderField} type="password"
              label={t('USER.fieldPasswordConfirm')} />
          </Grid>
          <Grid item xs>
            <Button raised type="submit">
              {t('USER.validate')}
            </Button>
          </Grid>
        </Grid>
      </form>
    );
  }
}

function validate(formProps) {
  const errors = {};

  if (!formProps.password) {
    errors.password = 'Password is required'
  }

  if (!formProps.passwordConfirm) {
    errors.passwordConfirm = 'Please confirm password';
  }

  if (!isEqual(formProps.password, formProps.passwordConfirm)) {
    errors.passwordConfirm = 'Passwords do not match';
  }

  return errors;
}

function onSubmitSuccess(result, dispatch) {
  dispatch(reset('userPassword'));
}

const mapStateToProps = (state) => ({
  user: state.user.item,
  token: state.auth.token,
  userid: state.auth.userid
});

UserPassword = reduxForm({ form: 'userPassword', validate, onSubmitSuccess })(UserPassword);

const mapDispatchToProps = {
  updateUser
};

export default connect(mapStateToProps, mapDispatchToProps)(translate()(UserPassword));






