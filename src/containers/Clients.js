import React, { Component } from 'react';
import Typography from 'material-ui/Typography';
import List from 'material-ui/List';
import Card from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import { connect } from 'react-redux';
import { map } from 'lodash';
import { translate } from 'react-i18next';
import { LinearProgress } from 'material-ui/Progress';

import ClientCard from '../components/ClientCard';
import ClientsToolBar from '../components/ClientsToolBar';
import { fetchClients } from '../actions/clients';
import { listStyle, elementStyle } from '../styles/lists';

class Clients extends Component {
  componentDidMount() {
    this.props.fetchClients(this.props.token);
  }

  render() {
    const { clients } = this.props;
    if (clients) {
      return this.renderClients();
    }
    return (<LinearProgress mode="indeterminate" />)
  }

  renderClients() {
    const { clients, t } = this.props;
    if (clients.length === 0) {
      return (
        <Card>
          <ClientsToolBar />
          <Typography type="title">{t('CLIENTS.noClient')}</Typography>
        </Card>
      )
    }
    return (
      <Card>
        <ClientsToolBar />
        <List style={listStyle}>
          {map(clients, (client) =>(
          <Paper style={elementStyle} key={client.id}>
            <ClientCard client={client}/>
          </Paper>
          ))}
        </List>
      </Card>
    );
  }
}

const mapStateToProps = (state) => ({
  clients: state.clients.list,
  token: state.auth.token
});

const mapDispatchToProps = {
  fetchClients,
};


export default connect(mapStateToProps, mapDispatchToProps)(translate()(Clients));

