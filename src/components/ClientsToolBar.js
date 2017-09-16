import React, { Component } from 'react';
import AddIcon from 'material-ui-icons/Add';
import AppBar from 'material-ui/AppBar';
import Typography from 'material-ui/Typography';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Dialog, { DialogContent, DialogTitle } from 'material-ui/Dialog';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';

import CreateClientForm from './CreateClientForm';
import {
  clientsSaving, clientsCreating
} from '../actions/clients';
import { projectsToolbarTitleStyle } from '../styles/projects';


class ClientsToolBar extends Component {
  toggleCreate(openCreate) {
    if (openCreate) {
      this.props.clientsCreating();
    } else {
      this.props.clientsSaving();
    }
  }

  render() {
    const { t, creating, clients } = this.props;
    return (
      <div>
        <AppBar position="static" color="default">
          <Toolbar disableGutters>
            <Typography type="title" color="inherit" style={projectsToolbarTitleStyle}>
              {t('CLIENTS.title')}
            </Typography>
            <Typography type="subheading" color="inherit">
              {t('CLIENTS.total')} {clients.length}
            </Typography>
            <IconButton color="contrast" onClick={this.toggleCreate.bind(this, true)}>
              <AddIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Dialog
          open={creating || false}
          onRequestClose={this.toggleCreate.bind(this, false)}>
          <DialogTitle>{t('CLIENTS.createNew')}</DialogTitle>
          <DialogContent>
            <CreateClientForm />
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  creating: state.clients.creating,
  clients: state.clients.list
});

const mapDispatchToProps = {
  clientsSaving,
  clientsCreating
};

export default connect(mapStateToProps, mapDispatchToProps)(translate()(ClientsToolBar));



