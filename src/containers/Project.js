import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';

import {
  fetchProject
} from '../actions/project';

class Project extends Component {
  componentDidMount() {
    this.props.fetchProject(this.props.match.params.projectid);
  }

  renderProject() {
    const { project, t } = this.props;
    return (
      <div>
        <h1>{t('PROJECT.title')} {project.name}</h1>
      </div>
    );
  }

  render() {
    const { project } = this.props;
    if (project) {
      return this.renderProject();
    }
    return (<div></div>)
  }
}

const mapStateToProps = (state) => ({
  project: state.project.item
});

const mapDispatchToProps = {
  fetchProject
};


export default connect(mapStateToProps, mapDispatchToProps)(translate()(Project));

