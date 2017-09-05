import React, { Component } from 'react';
import Clear from 'material-ui-icons/Clear';
import Flag from 'react-country-flag';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import { IconButton, ListItem } from 'material-ui';
import { map, last, split } from 'lodash';

import {
  projectsRemove
} from '../actions/projects';

class ProjectCard extends Component {
  redirectToProject(id) {
    const { project } = this.props;
    this.props.history.push(`/project/${project._id}`);
  }

  render() {
    const { project, projectsRemove, t } = this.props;
    return (
        <ListItem
          onClick={this.redirectToProject.bind(this, project._id)}
          rightIconButton={
            <IconButton
              onClick={projectsRemove.bind(this, project._id)}>
              <Clear />
            </IconButton>
          } >
            <div>
              {map(project.locales, (locale, i) => <Flag key={i} code={last(split(locale.code, '_'))} />)}
            </div>
            <h3>{project.name}</h3>
            <div>
              <b>{project.keys.length || 0}</b>&nbsp;
              <i>{t('PROJECTS.keysInProject')}</i>
            </div>
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

