import React, { Component } from 'react';
import Flag from 'react-country-flag';
import Clear from 'material-ui-icons/Clear';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import { ListItem, ListItemSecondaryAction } from 'material-ui/List';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import { map, last, split } from 'lodash';

import { projectsRemove } from '../actions/projects';
import { projectCardStyle } from '../styles/project';

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
    const { project, projectsRemove, t, token } = this.props;
    return (
        <ListItem button
          onClick={this.redirectToProject.bind(this, project._id)} >
          <Grid container direction="column">
            <Grid item xs>
              <Typography type="title">{project.name}</Typography>
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
                  <Typography type="body1">{project.keys.length || 0}</Typography>
                </Grid>
                <Grid item>
                  <Typography type="body2">{t('PROJECTS.keysInProject')}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <ListItemSecondaryAction>
            <IconButton
              onClick={projectsRemove.bind(this, token, project._id)}>
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
  projectsRemove
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(translate()(ProjectCard)));

