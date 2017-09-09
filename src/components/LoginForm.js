import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { reduxForm, Field } from 'redux-form';
import { TextField, RaisedButton } from 'material-ui';

import { loginUser } from '../actions/auth';
import { loginButtonStyle } from '../styles/login';

const renderField = ({ input, type, label, meta: { touched, error } }) => (
  <TextField hintText={label}
    floatingLabelText={label}
    type={type}
    errorText={touched && error}
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
        <Field name="email" component={renderField} type="text"
          label={t('LOGIN.placeholderEmail')} />
        <br />
        <Field name="password" component={renderField} type="password"
          label={t('LOGIN.placeholderPassword')} />
        <br />
        <RaisedButton type="submit"
          label={t('LOGIN.validate')} style={loginButtonStyle}/>
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
