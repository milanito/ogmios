import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { Card, LinearProgress } from 'material-ui';
import { Tabs, Tab } from 'material-ui/Tabs';

import ProjectMain from '../components/ProjectMain';
import ProjectLocales from '../components/ProjectLocales';
import ProjectKeys from '../components/ProjectKeys';
import ProjectTranslations from '../components/ProjectTranslations';
import { fetchProject } from '../actions/project';
import { fetchProjectLocales } from '../actions/locales';
import { fetchProjectKeys } from '../actions/keys';
import { fetchProjectUsers } from '../actions/users';

class Project extends Component {
  componentDidMount() {
    this.props.fetchProject(this.props.match.params.projectid);
    this.props.fetchProjectLocales(this.props.match.params.projectid);
    this.props.fetchProjectKeys(this.props.match.params.projectid);
    this.props.fetchProjectUsers(this.props.match.params.projectid);
  }

  renderProject() {
    const { t } = this.props;
    return (
      <Card>
        <Tabs>
          <Tab label={t('PROJECT.tabDetails')}>
            <ProjectMain />
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
        </Tabs>
      </Card>
    );
  }

  render() {
    const { project, fetching } = this.props;
    if (project && !fetching) {
      return this.renderProject();
    }
    return (<LinearProgress mode="indeterminate" />)
  }
}

const mapStateToProps = (state) => ({
  project: state.project.item,
  fetching: state.project.fetching
});

const mapDispatchToProps = {
  fetchProject,
  fetchProjectLocales,
  fetchProjectKeys,
  fetchProjectUsers
};


export default connect(mapStateToProps, mapDispatchToProps)(translate()(Project));

