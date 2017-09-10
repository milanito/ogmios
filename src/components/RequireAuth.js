import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';

import history from '../history';

export default function (ComposedComponent) {
  class Authentication extends Component {
    componentWillMount() {
      if (this.props.rehydrated && !this.props.authenticated) {
        history.push('/login');
      }
    }

    componentWillUpdate(nextProps) {
      if (this.props.rehydrated && !nextProps.authenticated) {
        history.push('/login');
      }
    }

    render() {
      if (this.props.rehydrated && !this.props.authenticated) {
        return <Redirect push to="/login" />;
      } else {
        return <ComposedComponent {...this.props} />
      }
    }
  }

  Authentication.propTypes = { authenticated: PropTypes.bool };

  const mapStateToProps = state => ({
    authenticated: state.auth.authenticated,
    rehydrated: state.auth.rehydrated
  });

  return withRouter(connect(mapStateToProps)(Authentication));
}
