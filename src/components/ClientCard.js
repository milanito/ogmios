import React, { Component } from 'react';
import Clear from 'material-ui-icons/Clear';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import { IconButton } from 'material-ui';
import { ListItem } from 'material-ui/List';

import {
  clientsRemove
} from '../actions/clients';

class ClientCard extends Component {
  redirectToClient() {
    const { client } = this.props;
    this.props.history.push(`/client/${client.id}`);
  }

  render() {
    const { client, clientsRemove } = this.props;
    return (
        <ListItem
          onClick={this.redirectToClient.bind(this)}
          rightIconButton={
            <IconButton
              onClick={clientsRemove.bind(this)}>
              <Clear />
            </IconButton>
          } >
          <h3>{client.name}</h3>
        </ListItem>
    )
  }
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = {
  clientsRemove
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(translate()(ClientCard)));


