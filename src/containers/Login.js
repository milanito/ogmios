import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';

import LoginForm from '../components/LoginForm';

class Login extends Component {
  render() {
    const { t } = this.props;
    return (
      <div>
        <h1>{t('LOGIN.title')}</h1>
        <LoginForm />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error  }
}

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(translate()(Login));
