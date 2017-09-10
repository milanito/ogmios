import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Typography from 'material-ui/Typography';
import Toolbar from 'material-ui/Toolbar';
import AddIcon from 'material-ui-icons/Add';
import Dialog, { DialogContent, DialogTitle } from 'material-ui/Dialog';
import IconButton from 'material-ui/IconButton';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';

import CreateProjectForm from './CreateProjectForm';
import { projectsSaving, projectsCreating } from '../actions/projects';
import {
  projectsToolbarTitleStyle, projectsCreateStyle
} from '../styles/projects';


class ProjectsToolBar extends Component {
  toggleCreate(openCreate) {
    if (openCreate) {
      this.props.projectsCreating();
    } else {
      this.props.projectsSaving();
    }
  }

  render() {
    const { t, creating, projects } = this.props;
    return (
      <div>
        <AppBar position="static">
          <Toolbar disableGutters>
            <Typography type="title" color="inherit" style={projectsToolbarTitleStyle}>
              {t('PROJECTS.title')}
            </Typography>
            <Typography type="subheading" color="inherit">
              {t('PROJECTS.total')} {projects.length}
            </Typography>
            <IconButton color="contrast" onClick={this.toggleCreate.bind(this, true)}>
              <AddIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Dialog
          style={projectsCreateStyle}
          open={creating || false}
          onRequestClose={this.toggleCreate.bind(this, false)}>
          <DialogTitle>{t('PROJECTS.createNew')}</DialogTitle>
          <DialogContent>
            <CreateProjectForm />
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  creating: state.projects.creating,
  projects: state.projects.list
});

const mapDispatchToProps = {
  projectsSaving,
  projectsCreating
};

export default connect(mapStateToProps, mapDispatchToProps)(translate()(ProjectsToolBar));


