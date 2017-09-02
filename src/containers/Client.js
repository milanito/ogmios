import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';

import {
  fetchClient
} from '../actions/client';

class Client extends Component {
  componentDidMount() {
    this.props.fetchClient(this.props.match.params.clientid);
  }

  renderClient() {
    const { client, t } = this.props;
    return (
      <div>
        <h1>{t('CLIENT.title')} {client.name}</h1>
      </div>
    );
  }

  render() {
    const { client } = this.props;
    if (client) {
      return this.renderClient();
    }
    return (<div></div>)
  }
}

const mapStateToProps = (state) => ({
  client: state.client.item
});

const mapDispatchToProps = {
  fetchClient
};


export default connect(mapStateToProps, mapDispatchToProps)(translate()(Client));


