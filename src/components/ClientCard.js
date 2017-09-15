import React, { Component } from 'react';
import Clear from 'material-ui-icons/Clear';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import { ListItem, ListItemSecondaryAction } from 'material-ui/List';

import { clientsRemove } from '../actions/clients';

class ClientCard extends Component {
  redirectToClient() {
    const { client } = this.props;
    this.props.history.push(`/client/${client.id}`);
  }

  render() {
    const { client, clientsRemove, token, t } = this.props;
    return (
        <ListItem button
          onClick={this.redirectToClient.bind(this)}>
          <Grid container direction="column">
            <Grid item xs>
              <Typography type="title">{client.name}</Typography>
            </Grid>
            <Divider />
            <Grid item xs>
              <Typography type="body1">
                {client.projects} {t('CLIENTS.projectsSize')}
              </Typography>
            </Grid>
          </Grid>
          <ListItemSecondaryAction>
            <IconButton
              onClick={clientsRemove.bind(this, token, client.id)}>
              <Clear />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
    )
  }
}

const mapStateToProps = (state) => ({
  token: state.auth.token
});

const mapDispatchToProps = {
  clientsRemove
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(translate()(ClientCard)));


