import React, { Component } from 'react';
import Clear from 'material-ui-icons/Clear';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import { IconButton } from 'material-ui';
import { ListItem } from 'material-ui/List';

import {
  projectsRemove
} from '../actions/projects';

class ProjectCard extends Component {
  redirectToProject(id) {
    const { project } = this.props;
    this.props.history.push(`/project/${project._id}`);
  }

  render() {
    const { project, projectsRemove } = this.props;
    return (
        <ListItem
          onClick={this.redirectToProject.bind(this, project._id)}
          rightIconButton={
            <IconButton
              onClick={projectsRemove.bind(this, project._id)}>
              <Clear />
            </IconButton>
          } >
          <h3>{project.name}</h3>
        </ListItem>
    )
  }
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = {
  projectsRemove
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(translate()(ProjectCard)));

