import React, { Component } from 'react';
import Tabs, { Tab } from 'material-ui/Tabs';
import AppBar from 'material-ui/AppBar';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { LinearProgress } from 'material-ui';

import ClientMain from '../components/ClientMain';
import ClientProjects from '../components/ClientProjects';
import { projectToolbarTitleStyle } from '../styles/project';
import { fetchClient } from '../actions/client';
import { fetchProjects } from '../actions/projects';

class Client extends Component {
  constructor(props) {
    super(props);

    this.state = { value: 0, fetched: false };
  }

  componentWillReceiveProps(newProps) {
    const { token } = newProps;
    if (token && !this.state.fetched) {
      this.setState({ fetched: true });
      this.props.fetchClient(token, this.props.match.params.clientid);
      this.props.fetchProjects(token);
    }
  }

  handleChange() {
    return (event, value) => {
      this.setState({ value });
    };
  }

  renderClient() {
    const { client, t } = this.props;
    const { value } = this.state;
    return (
      <div>
        <AppBar position="static">
          <Grid container direction="row">
            <Grid item xs>
              <Typography type="title" color="inherit" style={projectToolbarTitleStyle}>
                {client.name}
              </Typography>
            </Grid>
            <Grid item xs>
              <Tabs value={value} onChange={this.handleChange()}>
                <Tab label={t('CLIENT.tabDetails')} />
                <Tab label={t('CLIENT.tabProjects')} />
              </Tabs>
            </Grid>
          </Grid>
        </AppBar>
        <Paper>
          {value === 0 && <ClientMain />}
          {value === 1 && <ClientProjects />}
        </Paper>
      </div>
    )
  }

  render() {
    const { client, fetching } = this.props;
    if (client && !fetching) {
      return this.renderClient();
    }
    return (<LinearProgress mode="indeterminate" />)
  }
}

const mapStateToProps = (state) => ({
  client: state.client.item,
  fetching: state.client.fetching,
  token: state.auth.token
});

const mapDispatchToProps = {
  fetchClient,
  fetchProjects
};


export default connect(mapStateToProps, mapDispatchToProps)(translate()(Client));


