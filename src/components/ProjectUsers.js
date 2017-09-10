import React, { Component } from 'react';
import AccountCircleIcon from 'material-ui-icons/AccountCircle';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { map, isEqual } from 'lodash';
import { Chip, Avatar } from 'material-ui';

class ProjectUsers extends Component {
  handleDelete(user) {
  }

  renderUser(user, i) {
    return (
      <Chip key={i}
        onRequestDelete={this.handleDelete.bind(this, user)}
        avatar={<Avatar><AccountCircleIcon /></Avatar>}
        label={user.email}/>
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
          {map(users, (user, i) => this.renderUser(user, i))}
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



