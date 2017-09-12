import React, { Component } from 'react';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { map, isEqual, first, upperCase } from 'lodash';

class ProjectUsers extends Component {
  handleDelete(user) {
  }

  changeRole(user) {
  }

  renderUser(user, i) {
    if (isEqual(user.role, 'owner')) {
      return (
        <Grid  key={i} item xs>
          <Chip
            avatar={<Avatar>{first(upperCase(user.role))}</Avatar>}
            label={user.email}/>
        </Grid>
      )
    }
    return (
      <Grid  key={i} item xs>
        <Chip
          onClick={this.changeRole.bind(this, user)}
          onRequestDelete={this.handleDelete.bind(this, user)}
          avatar={<Avatar>{first(upperCase(user.role))}</Avatar>}
          label={user.email}/>
      </Grid>
    )
  }

  render() {
    const { users, t } = this.props;
    return (
      <Grid container direction="column">
        <Grid item xs>
          <Typography type="subheading">
            {t('PROJECT.usersList')}
          </Typography>
        </Grid>
        <Grid item xs>
          <Grid container direction="row">
            {map(users, (user, i) => this.renderUser(user, i))}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  project: state.project.item,
  users: state.users.list,
});

const mapDispatchToProps = {
};


export default connect(mapStateToProps, mapDispatchToProps)(translate()(ProjectUsers));



