import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { TextField } from 'material-ui';
import { isEmpty } from 'lodash';
import { reduxForm, Field } from 'redux-form';

import { loginUser } from '../actions/auth';
import { loginButtonStyle } from '../styles/login';

const renderField = ({ input, type, label, meta: { touched, error } }) => (
  <TextField label={label}
    type={type}
    error={touched && !isEmpty(error)}
    helperText={touched && error}
    {...input}
    />
);

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(props) {
    this.props.loginUser(props);
  }

  render() {
    const { handleSubmit, t } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit)}>
        <Grid container direction="column" align="center">
          <Grid item xs>
            <Field name="email" component={renderField} type="text"
              label={t('LOGIN.placeholderEmail')} />
          </Grid>
          <Grid item xs>
            <Field name="password" component={renderField} type="password"
              label={t('LOGIN.placeholderPassword')} />
          </Grid>
          <Grid item xs>
            <Button type="submit" raised style={loginButtonStyle}>
              {t('LOGIN.validate')}
            </Button>
          </Grid>
        </Grid>
      </form>
    )
  }
}

function validate(formProps) {
  const errors = {};
  const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  if (!formProps.email) {
    errors.email = 'Email is required'
  }

  if (!re.test(formProps.email)) {
    errors.email = 'Email is invalid';
  }

  if (!formProps.password) {
    errors.password = 'Password is required'
  }

  return errors;
}


const mapStateToProps = (state) => ({
});

LoginForm = reduxForm({ form: 'login', validate })(LoginForm);

const mapDispatchToProps = {
  loginUser
};

export default connect(mapStateToProps, mapDispatchToProps)(translate()(LoginForm));
