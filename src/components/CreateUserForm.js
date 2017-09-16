import React, { Component } from 'react';
import * as EmailValidator from 'email-validator';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { reduxForm, Field, reset } from 'redux-form';
import { isEmpty, isEqual, findIndex } from 'lodash';

import { usersAdd } from '../actions/users';

const renderField = ({ input, type, label, meta: { touched, error } }) => (
  <TextField label={label}
    type={type}
    error={touched && !isEmpty(error)}
    helperText={touched && error}
    {...input}
    />
);

class CreateUserForm extends Component {
  constructor(props) {
    super(props);

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(props) {
    this.props.usersAdd(this.props.token, props);
  }

  render() {
    const { handleSubmit, t } = this.props;
    return (
        <form onSubmit={handleSubmit(this.handleFormSubmit)}>
          <Grid container direction="column" align="center">
            <Grid item xs>
              <Field name="email" component={renderField} type="text"
                label={t('USERS.placeholderEmail')} />
            </Grid>
            <Grid item xs>
              <Field name="username" component={renderField} type="text"
                label={t('USERS.placeholderUsername')} />
            </Grid>
            <Grid item xs>
              <Field name="password" component={renderField} type="password"
                label={t('USERS.placeholderPassword')} />
            </Grid>
            <Grid item xs>
              <Field name="passwordConfirm" component={renderField} type="password"
                label={t('USERS.placeholderPasswordConfirm')} />
            </Grid>
            <Grid item xs>
              <Button raised type="submit">{t('PROJECT.validate')}</Button>
            </Grid>
          </Grid>
        </form>
    )
  }
}

function validate(formProps, props) {
  const errors = {};
  const { users } = props;

  if(!formProps.username) {
    errors.username = 'Username is required'
  }

  if(!formProps.email) {
    errors.name = 'Email is required'
  }

  if (!EmailValidator.validate(formProps.email)) {
    errors.email = 'Email is invalid';
  }

  const idx = findIndex(users,
    user => isEqual(user.email, formProps.email));

  if (idx > -1) {
    errors.email = 'User already registered';
  }

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
  dispatch(reset('createUser'));
}

const mapStateToProps = (state) => ({
  token: state.auth.token,
  users: state.users.list
});

CreateUserForm = reduxForm({ form: 'createUser', validate, onSubmitSuccess })(CreateUserForm);

const mapDispatchToProps = {
  usersAdd
};

export default connect(mapStateToProps, mapDispatchToProps)(translate()(CreateUserForm));
