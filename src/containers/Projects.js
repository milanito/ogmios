import React, { Component } from 'react';
import { connect } from 'react-redux';
import { map } from 'lodash';
import { translate } from 'react-i18next';
import { Card } from 'material-ui/Card';
import { List } from 'material-ui';

import ProjectCard from '../components/ProjectCard';
import ProjectsToolBar from '../components/ProjectsToolBar';
import {
  fetchProjects
} from '../actions/projects';

class Projects extends Component {
  componentDidMount() {
    this.props.fetchProjects();
  }

  render() {
    const { projects } = this.props;
    return (
      <Card>
        <ProjectsToolBar />
        <List>
          {map(projects, (project, i) =>
            (<ProjectCard key={i} project={project} />))}
        </List>
      </Card>
    );
  }
}

const mapStateToProps = (state) => ({
  projects: state.projects.list
});

const mapDispatchToProps = {
  fetchProjects,
};

export default connect(mapStateToProps, mapDispatchToProps)(translate()(Projects));

