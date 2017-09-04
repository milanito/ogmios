import React, { Component } from 'react';
import AccountCircleIcon from 'material-ui-icons/AccountCircle';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { map } from 'lodash';
import { Chip, Avatar } from 'material-ui';

class ProjectUsers extends Component {
  handleDelete(user) {
  }

  renderUser(user, i) {
    return (
      <Chip key={i}
        onRequestDelete={this.handleDelete.bind(this, user)}>
        <Avatar icon={<AccountCircleIcon />} />
        <label>{user.email}&nbsp;</label>
        <span>{user.role}</span>
      </Chip>
    )
  }

  render() {
    const { users } = this.props;
    return (
      <div>
        <h1>USERS</h1>
        {map(users, (user, i) => this.renderUser(user, i))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  project: state.project.item,
  users: state.users.list
});

const mapDispatchToProps = {
};


export default connect(mapStateToProps, mapDispatchToProps)(translate()(ProjectUsers));



