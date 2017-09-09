import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';

import history from '../history';

export default function (ComposedComponent) {
  class Authentication extends Component {
    componentWillMount() {
      if (!this.props.authenticated) {
        history.push('/login');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        history.push('/login');
      }
    }

    render() {
      if (!this.props.authenticated) {
        return <Redirect push to="/login" />;
      } else {
        return <ComposedComponent {...this.props} />
      }
    }
  }

  Authentication.propTypes = { authenticated: PropTypes.bool };

  function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated };
  }

  return withRouter(connect(mapStateToProps)(Authentication));
}
