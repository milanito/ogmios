import React, { Component } from 'react';
import Tabs, { Tab } from 'material-ui/Tabs';
import AppBar from 'material-ui/AppBar';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { LinearProgress } from 'material-ui';

import ProjectMain from '../components/ProjectMain';
import ProjectLocales from '../components/ProjectLocales';
import ProjectKeys from '../components/ProjectKeys';
import ProjectTranslations from '../components/ProjectTranslations';
import { fetchProject } from '../actions/project';
import { fetchProjectLocales } from '../actions/locales';
import { fetchProjectKeys } from '../actions/keys';
import { fetchProjectUsers } from '../actions/users';
import { projectToolbarTitleStyle } from '../styles/project';
import { clearLocales } from '../actions/translations';

class Project extends Component {
  constructor(props) {
    super(props);

    this.state = { value: 0 };
  }

  componentDidMount() {
    if (this.props.token) {
      this.props.clearLocales();
      this.props.fetchProject(this.props.token, this.props.match.params.projectid);
      this.props.fetchProjectLocales(this.props.token, this.props.match.params.projectid);
      this.props.fetchProjectKeys(this.props.token, this.props.match.params.projectid);
      this.props.fetchProjectUsers(this.props.token, this.props.match.params.projectid);
    }
  }

  handleChange() {
    return (event, value) => {
      this.setState({ value });
    };
  }

  renderProject() {
    const { t, project } = this.props;
    const { value } = this.state;

    return (
      <div>
        <AppBar position="static">
          <Grid container direction="row">
            <Grid item xs>
              <Typography type="title" color="inherit" style={projectToolbarTitleStyle}>
                {project.name}
              </Typography>
            </Grid>
            <Grid item xs>
              <Tabs value={value} onChange={this.handleChange()}>
                <Tab label={t('PROJECT.tabDetails')} />
                <Tab label={t('PROJECT.tabLocales')} />
                <Tab label={t('PROJECT.tabKeys')} />
                <Tab label={t('PROJECT.tabTranslations')} />
              </Tabs>
            </Grid>
          </Grid>
        </AppBar>
        <Paper>
          {value === 0 && <ProjectMain />}
          {value === 1 && <ProjectLocales />}
          {value === 2 && <ProjectKeys />}
          {value === 3 && <ProjectTranslations />}
        </Paper>
      </div>
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
  fetching: state.project.fetching,
  token: state.auth.token
});

const mapDispatchToProps = {
  fetchProject,
  fetchProjectLocales,
  fetchProjectKeys,
  fetchProjectUsers,
  clearLocales
};


export default connect(mapStateToProps, mapDispatchToProps)(translate()(Project));

