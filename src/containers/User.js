import React, { Component } from 'react';
import Tabs, { Tab } from 'material-ui/Tabs';
import AppBar from 'material-ui/AppBar';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { LinearProgress } from 'material-ui';

import UserEmail from '../components/UserEmail';
import UserRole from '../components/UserRole';
import { projectToolbarTitleStyle } from '../styles/project';
import { fetchUser } from '../actions/user';

class User extends Component {
  constructor(props) {
    super(props);

    this.state = { value: 0, fetched: false };
  }

  componentWillReceiveProps(newProps) {
    const { token } = newProps;
    if (token && !this.state.fetched) {
      this.setState({ fetched: true });
      this.props.fetchUser(token, this.props.match.params.userid);
    }
  }

  handleChange() {
    return (event, value) => {
      this.setState({ value });
    };
  }

  renderUser() {
    const { user, t } = this.props;
    const { value } = this.state;
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
              <UserRole />
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
  fetchUser,
};


export default connect(mapStateToProps, mapDispatchToProps)(translate()(User));



