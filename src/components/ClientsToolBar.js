import React, { Component } from 'react';
import AddIcon from 'material-ui-icons/Add';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { IconButton, Dialog } from 'material-ui';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

import {
  clientsSaving, clientsCreating
} from '../actions/clients';


class ClientsToolBar extends Component {
  toggleCreate(openCreate) {
    if (openCreate) {
      this.props.clientsCreating();
    } else {
      this.props.clientsSaving();
    }
  }

  render() {
    const { t, creating } = this.props;
    const actions = [];
    return (
      <div>
        <Toolbar>
          <ToolbarGroup>
            <ToolbarTitle text={t('CLIENTS.title')} />
            <ToolbarSeparator />
            <IconButton onClick={this.toggleCreate.bind(this, true)}><AddIcon /></IconButton>
          </ToolbarGroup>
        </Toolbar>
        <Dialog
          title={t('CLIENTS.createNew')}
          actions={actions}
          modal={false}
          open={creating || false}
          onRequestClose={this.toggleCreate.bind(this, false)}>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  creating: state.clients.creating
});

const mapDispatchToProps = {
  clientsSaving,
  clientsCreating
};

export default connect(mapStateToProps, mapDispatchToProps)(translate()(ClientsToolBar));



