import React, { Component } from 'react';
import Clear from 'material-ui-icons/Clear';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import { ListItem, ListItemSecondaryAction } from 'material-ui/List';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { withRouter } from 'react-router-dom';

import {
  clientsRemove
} from '../actions/clients';
import { projectCardStyle } from '../styles/project';

class ClientCard extends Component {
  redirectToClient() {
    const { client } = this.props;
    this.props.history.push(`/client/${client.id}`);
  }

  render() {
    const { client, clientsRemove, token } = this.props;
    return (
        <ListItem button
          onClick={this.redirectToClient.bind(this)}>
          <Typography type="title">{client.name}</Typography>
          <ListItemSecondaryAction>
            <IconButton
              onClick={clientsRemove.bind(this, token, client._id)}>
              <Clear />
            </IconButton>
          </ListItemSecondaryAction>
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


