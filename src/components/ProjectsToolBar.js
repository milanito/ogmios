import React, { Component } from 'react';
import AddIcon from 'material-ui-icons/Add';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { IconButton, Dialog } from 'material-ui';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

import CreateProjectForm from './CreateProjectForm';
import {
  projectsSaving, projectsCreating
} from '../actions/projects';


class ProjectsToolBar extends Component {
  toggleCreate(openCreate) {
    if (openCreate) {
      this.props.projectsCreating();
    } else {
      this.props.projectsSaving();
    }
  }

  render() {
    const { t, creating } = this.props;
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
          title={t('PROJECTS.createNew')}
          actions={actions}
          modal={false}
          open={creating || false}
          onRequestClose={this.toggleCreate.bind(this, false)}>
          <CreateProjectForm />
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  creating: state.projects.creating
});

const mapDispatchToProps = {
  projectsSaving,
  projectsCreating
};

export default connect(mapStateToProps, mapDispatchToProps)(translate()(ProjectsToolBar));


