import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { Tabs, Tab } from 'material-ui/Tabs';

import ProjectLocales from '../components/ProjectLocales';
import ProjectKeys from '../components/ProjectKeys';
import ProjectTranslations from '../components/ProjectTranslations';
import { fetchProject } from '../actions/project';
import { fetchProjectLocales } from '../actions/locales';
import { fetchProjectKeys } from '../actions/keys';

class Project extends Component {
  componentDidMount() {
    this.props.fetchProject(this.props.match.params.projectid);
    this.props.fetchProjectLocales(this.props.match.params.projectid);
    this.props.fetchProjectKeys(this.props.match.params.projectid);
  }

  renderProject() {
    const { project, t } = this.props;
    return (
      <Tabs>
        <Tab label={t('PROJECT.tabDetails')}>
          <h1>{t('PROJECT.title')} {project.name}</h1>
        </Tab>
        <Tab label={t('PROJECT.tabLocales')}>
          <ProjectLocales />
        </Tab>
        <Tab label={t('PROJECT.tabKeys')}>
          <ProjectKeys />
        </Tab>
        <Tab label={t('PROJECT.tabTranslations')}>
          <ProjectTranslations />
        </Tab>
        <Tab label={t('PROJECT.tabSettings')}>
        </Tab>
      </Tabs>
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
  fetchProject,
  fetchProjectLocales,
  fetchProjectKeys,
};


export default connect(mapStateToProps, mapDispatchToProps)(translate()(Project));

