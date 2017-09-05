import React, { Component } from 'react';
import { connect } from 'react-redux';
import { map } from 'lodash';
import { translate } from 'react-i18next';
import { List, Card, Paper } from 'material-ui';

import ProjectCard from '../components/ProjectCard';
import ProjectsToolBar from '../components/ProjectsToolBar';
import { fetchProjects } from '../actions/projects';
import { listStyle, elementStyle } from '../styles/lists';

class Projects extends Component {
  componentDidMount() {
    this.props.fetchProjects();
  }

  render() {
    const { projects } = this.props;
    if (projects) {
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
    return (<div></div>);
  }
}

const mapStateToProps = (state) => ({
  projects: state.projects.list
});

const mapDispatchToProps = {
  fetchProjects,
};

export default connect(mapStateToProps, mapDispatchToProps)(translate()(Projects));

