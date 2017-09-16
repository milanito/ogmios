import React, { Component } from 'react';
import Typography from 'material-ui/Typography';
import List from 'material-ui/List';
import Card from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import { connect } from 'react-redux';
import { map } from 'lodash';
import { translate } from 'react-i18next';
import { LinearProgress } from 'material-ui/Progress';

import ProjectCard from '../components/ProjectCard';
import ProjectShortcut from '../components/ProjectShortcut';
import ProjectsToolBar from '../components/ProjectsToolBar';
import { fetchProjects } from '../actions/projects';
import { listStyle, elementStyle } from '../styles/lists';

class Projects extends Component {
  constructor(props) {
    super(props);

    this.state = { fetched: false };
  }

  componentWillReceiveProps(newProps) {
    const { token } = newProps;
    if (token && !this.state.fetched) {
      this.setState({ fetched: true });
      this.props.fetchProjects(token);
    }
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
          <List style={listStyle}>
            <Typography type="title">{t('PROJECTS.noProject')}</Typography>
          </List>
        </Card>
      )
    }
    return (
      <Card>
        <ProjectsToolBar />
        <ProjectShortcut />
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

