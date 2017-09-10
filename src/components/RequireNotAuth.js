import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';

import history from '../history';

export default function (ComposedComponent) {
  class NotAuthentication extends Component {
    componentWillMount() {
      if (this.props.rehydrated && this.props.authenticated) {
        history.push('/');
      }
    }

    componentWillUpdate(nextProps) {
      if (this.props.rehydrated && nextProps.authenticated) {
        history.push('/projects');
      }
    }

    render() {
      if (this.props.rehydrated && this.props.authenticated) {
        return <Redirect push to="/projects" />;
      } else {
        return <ComposedComponent {...this.props} />
      }
    }
  }

  NotAuthentication.propTypes = { authenticated: PropTypes.bool };

  const mapStateToProps = state => ({
    authenticated: state.auth.authenticated,
    rehydrated: state.auth.rehydrated
  });

  return withRouter(connect(mapStateToProps)(NotAuthentication));
}
