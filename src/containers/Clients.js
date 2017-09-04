import React, { Component } from 'react';
import { connect } from 'react-redux';
import { map } from 'lodash';
import { translate } from 'react-i18next';
import { List, Card, Divider } from 'material-ui';

import ClientCard from '../components/ClientCard';
import ClientsToolBar from '../components/ClientsToolBar';

import {
  fetchClients
} from '../actions/clients';

class Clients extends Component {
  componentDidMount() {
    this.props.fetchClients();
  }

  render() {
    const { clients } = this.props;
    return (
      <Card>
        <ClientsToolBar />
        <List>
          {map(clients, (client, i) =>(
            <div key={client.id}>
              <ClientCard client={client}/>
              <Divider />
            </div>
          ))}
        </List>
      </Card>
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

