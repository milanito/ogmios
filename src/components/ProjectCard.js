import React, { Component } from 'react';
import Clear from 'material-ui-icons/Clear';
import Flag from 'react-country-flag';
import Grid from 'material-ui/Grid';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import { IconButton, ListItem, Divider } from 'material-ui';
import { map, last, split } from 'lodash';

import {
  projectsRemove
} from '../actions/projects';

class ProjectCard extends Component {
  redirectToProject(id) {
    const { project } = this.props;
    this.props.history.push(`/project/${project._id}`);
  }

  renderLocale(locale, ks) {
    return (
      <Grid item key={locale.code}>
        <Flag code={last(split(locale.code, '_'))} svg />
      </Grid>
    )
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
          <Grid container direction="column">
            <Grid item xs>
              <h2>{project.name}</h2>
            </Grid>
            <Divider />
            <Grid item xs>
              <Grid container direction="row">
                {map(project.locales, locale => this.renderLocale(locale, project.keys))}
              </Grid>
            </Grid>
            <Grid item xs>
              <Grid container direction="row">
                <Grid item>
                  <b>{project.keys.length || 0}</b>
                </Grid>
                <Grid item>
                  <i>{t('PROJECTS.keysInProject')}</i>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
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

