import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { LinearProgress } from 'material-ui';

import UserEmail from '../components/UserEmail';
import UserPassword from '../components/UserPassword';
import { projectToolbarTitleStyle } from '../styles/project';
import { fetchMe } from '../actions/user';

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = { fetched: false };
  }

  componentWillReceiveProps(newProps) {
    const { token } = newProps;
    if (token && !this.state.fetched) {
      this.setState({ fetched: true });
      this.props.fetchMe(token);
    }
  }

  renderUser() {
    const { user } = this.props;
    return (
      <div>
        <AppBar position="static">
          <Grid container direction="row">
            <Grid item xs>
              <Typography type="title" color="inherit" style={projectToolbarTitleStyle}>
                {user.email}
              </Typography>
            </Grid>
          </Grid>
        </AppBar>
        <Paper>
          <Grid container direction="column" align="center">
            <Grid item xs>
              <UserEmail />
            </Grid>
            <Grid item xs>
              <UserPassword />
            </Grid>
          </Grid>
        </Paper>
      </div>
    )
  }

  render() {
    const { user, fetching } = this.props;
    if (user && !fetching) {
      return this.renderUser();
    }
    return (<LinearProgress mode="indeterminate" />)
  }
}

const mapStateToProps = (state) => ({
  user: state.user.item,
  fetching: state.user.fetching,
  token: state.auth.token
});

const mapDispatchToProps = {
  fetchMe,
};


export default connect(mapStateToProps, mapDispatchToProps)(translate()(Settings));

