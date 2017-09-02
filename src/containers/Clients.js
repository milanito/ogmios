import React, { Component } from 'react';
import { connect } from 'react-redux';
import { map } from 'lodash';
import { Link } from 'react-router-dom';
import { translate } from 'react-i18next';

import {
  fetchClients
} from '../actions/clients';

class Clients extends Component {
  componentDidMount() {
    this.props.fetchClients();
  }

  renderClients() {
    const clients = this.props.clients || [];

    return map(clients, (client, i) => {
      const url = `/client/${client.id}`;
      return <li key={i}><Link to={url}>{client.name}</Link></li>
    });
  }

  render() {
    const { t } = this.props;
    return (
      <div>
        <h1>{t('CLIENTS.title')}</h1>
        <ul>
          { this.renderClients() }
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  clients: state.clients.list
});

const mapDispatchToProps = {
  fetchClients,
};


export default connect(mapStateToProps, mapDispatchToProps)(translate()(Clients));

