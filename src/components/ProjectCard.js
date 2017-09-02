import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { Link } from 'react-router-dom';
import { RaisedButton, Menu, MenuItem, Popover } from 'material-ui';
import { ListItem } from 'material-ui/List';

import {
  projectsRemove
} from '../actions/projects';

class ProjectCard extends Component {
  constructor(props) {
    super(props);

    this.state = { open: false };
  }

  handleActions(event) {
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  }

  handleRequestClose() {
    this.setState({
      open: false,
    });
  };

  render() {
    const { project, t, projectsRemove } = this.props;
    const url = `/project/${project._id}`;
    return (
        <ListItem>
          <Link to={url}>
            <h3>{project.name}</h3>
          </Link>
          <RaisedButton
            onClick={this.handleActions.bind(this)}
            label={t('PROJECT.actions')} />
          <Popover
            open={this.state.open}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
            onRequestClose={this.handleRequestClose.bind(this)}>
            <Menu>
              <Link to={url}>
                <MenuItem primaryText={t('PROJECTS.projectOpen')} />
              </Link>
              <MenuItem primaryText={t('PROJECTS.projectDelete')} onClick={projectsRemove.bind(this, project._id)} />
            </Menu>
          </Popover>
        </ListItem>
    )
  }
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = {
  projectsRemove
};

export default connect(mapStateToProps, mapDispatchToProps)(translate()(ProjectCard));

