import React, { Component } from 'react';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { Snackbar } from 'material-ui';
import { get, isEmpty } from 'lodash';

import LoginForm from '../components/LoginForm';
import { loginPanelStyle } from '../styles/login';

class Login extends Component {
  render() {
    const { t, error } = this.props;
    return (
      <Grid container align="center">
        <Grid item xs>
          <Grid
            container
            align="center"
            justify="center">
            <Grid item>
              <Paper style={loginPanelStyle}>
                <h1>{t('LOGIN.title')}</h1>
                <LoginForm />
              </Paper>
            </Grid>
          </Grid>
        </Grid>
        <Snackbar
          open={!isEmpty(get(error, 'login.message', ''))}
          message={get(error, 'login.message', '')}
          autoHideDuration={4000} />
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  error: state.auth.error
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(translate()(Login));
