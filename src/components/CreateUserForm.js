import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { isEmpty, isEqual } from 'lodash';
import { reduxForm, Field, reset } from 'redux-form';

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
                label={t('USERS.placeholderName')} />
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

function validate(formProps) {
  const errors = {};
  const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  if(!formProps.email) {
    errors.name = 'Email is required'
  }

  if (!re.test(formProps.email)) {
    errors.email = 'Email is invalid';
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
  token: state.auth.token
});

CreateUserForm = reduxForm({ form: 'createUser', validate, onSubmitSuccess })(CreateUserForm);

const mapDispatchToProps = {
  usersAdd
};

export default connect(mapStateToProps, mapDispatchToProps)(translate()(CreateUserForm));
