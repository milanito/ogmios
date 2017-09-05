import React, { Component } from 'react';
import { connect } from 'react-redux';
import { map } from 'lodash';
import { translate } from 'react-i18next';
import { List, Card, Paper } from 'material-ui';

import ClientCard from '../components/ClientCard';
import ClientsToolBar from '../components/ClientsToolBar';
import { fetchClients } from '../actions/clients';
import { listStyle, elementStyle } from '../styles/lists';

class Clients extends Component {
  componentDidMount() {
    this.props.fetchClients();
  }

  render() {
    const { clients } = this.props;
    if (clients) {
      return (
        <Card>
          <ClientsToolBar />
          <List style={listStyle}>
            {map(clients, (client, i) =>(
              <Paper style={elementStyle} key={client.id}>
                <ClientCard client={client}/>
              </Paper>
            ))}
          </List>
        </Card>
      );
    }
    return (<div></div>);
  }
}

const mapStateToProps = (state) => ({
  clients: state.clients.list
});

const mapDispatchToProps = {
  fetchClients,
};


export default connect(mapStateToProps, mapDispatchToProps)(translate()(Clients));

