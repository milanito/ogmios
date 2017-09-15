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
import {
  map, last, split, round, multiply, divide, size, keys, filter,
  isEmpty, get
} from 'lodash';

import { projectsRemove } from '../actions/projects';
import { clientRemoveProject } from '../actions/client';
import { projectCardStyle } from '../styles/project';
import { canDeleteProject } from '../utils';

class ProjectCard extends Component {
  redirectToProject(id) {
    const { project } = this.props;
    this.props.history.push(`/project/${project._id}`);
  }

  remove() {
    const { project, projectsRemove, clientRemoveProject, token, client } = this.props;
    if (client) {
      clientRemoveProject(token, client.id, project._id);
    } else {
      projectsRemove(token, project._id);
    }
  }

  renderLocale(locale) {
    return (
      <Grid item key={locale.code}>
        <Flag code={last(split(locale.code, '_'))} svg />
      </Grid>
    )
  }

  renderDelete() {
    const { project, projectsRemove, t, token, role } = this.props;

    if (canDeleteProject(this.props.userid, this.props.role, this.props.project)) {
      return (
        <ListItemSecondaryAction>
          <IconButton
            onClick={this.remove.bind(this)}>
            <Clear />
          </IconButton>
        </ListItemSecondaryAction>
      )
    }
    return (<div></div>)
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
                {map(project.locales, locale => this.renderLocale(locale))}
              </Grid>
            </Grid>
            <Grid item xs>
              <Grid container direction="row">
                <Grid item>
                  <Typography type="body1">{size(get(project, 'keys', []))}</Typography>
                </Grid>
                <Grid item>
                  <Typography type="body2">{t('PROJECTS.keysInProject')}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {this.renderDelete()}
        </ListItem>
    )
  }
}

const mapStateToProps = (state) => ({
  token: state.auth.token,
  role: state.auth.role,
  userid: state.auth.userid
});

const mapDispatchToProps = {
  projectsRemove,
  clientRemoveProject
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(translate()(ProjectCard)));

