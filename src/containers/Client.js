import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';

import ClientMain from '../components/ClientMain';
import { fetchClient } from '../actions/client';
import { fetchProjects } from '../actions/projects';

class Client extends Component {
  componentDidMount() {
    this.props.fetchClient(this.props.match.params.clientid);
    this.props.fetchProjects();
  }

  render() {
    const { client } = this.props;
    if (client) {
      return (<ClientMain />)
    }
    return (<div></div>)
  }
}

const mapStateToProps = (state) => ({
  client: state.client.item
});

const mapDispatchToProps = {
  fetchClient,
  fetchProjects
};


export default connect(mapStateToProps, mapDispatchToProps)(translate()(Client));


