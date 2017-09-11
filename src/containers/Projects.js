import React, { Component } from 'react';
import Typography from 'material-ui/Typography';
import { connect } from 'react-redux';
import { map } from 'lodash';
import { translate } from 'react-i18next';
import { List, Card, Paper, LinearProgress } from 'material-ui';

import ProjectCard from '../components/ProjectCard';
import ProjectsToolBar from '../components/ProjectsToolBar';
import { fetchProjects } from '../actions/projects';
import { listStyle, elementStyle } from '../styles/lists';

class Projects extends Component {
  componentDidMount() {
    this.props.fetchProjects(this.props.token);
  }

  render() {
    const { projects } = this.props;
    if (projects) {
      return this.renderProjects();
    }
    return (<LinearProgress mode="indeterminate" />)
  }

  renderProjects() {
    const { projects, t } = this.props;
    if (projects.length === 0) {
      return (
        <Card>
          <ProjectsToolBar />
          <Typography type="title">{t('PROJECTS.noProject')}</Typography>
        </Card>
      )
    }
    return (
      <Card>
        <ProjectsToolBar />
        <List style={listStyle}>
          {map(projects, (project) =>(
          <Paper style={elementStyle} key={project._id}>
            <ProjectCard project={project} />
          </Paper>
          ))}
        </List>
      </Card>
    );
  }
}

const mapStateToProps = (state) => ({
  projects: state.projects.list,
  token: state.auth.token
});

const mapDispatchToProps = {
  fetchProjects,
};

export default connect(mapStateToProps, mapDispatchToProps)(translate()(Projects));

