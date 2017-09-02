import React, { Component } from 'react';
import AddIcon from 'material-ui-icons/Add';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { IconButton, Dialog } from 'material-ui';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

import CreateProjectForm from './CreateProjectForm';

class ProjectsToolBar extends Component {
  constructor(props) {
    super(props);

    this.state = { openCreate: false };
  }

  toggleCreate(openCreate) {
    this.setState({ openCreate });
  };

  render() {
    const { t } = this.props;
    const actions = [];
    return (
      <div>
        <Toolbar>
          <ToolbarGroup>
            <ToolbarTitle text={t('PROJECTS.title')} />
            <ToolbarSeparator />
            <IconButton onClick={this.toggleCreate.bind(this, true)}><AddIcon /></IconButton>
          </ToolbarGroup>
        </Toolbar>
        <Dialog
          title="Dialog With Actions"
          actions={actions}
          modal={false}
          open={this.state.openCreate}
          onRequestClose={this.toggleCreate.bind(this, false)}>
          <CreateProjectForm />
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(translate()(ProjectsToolBar));


