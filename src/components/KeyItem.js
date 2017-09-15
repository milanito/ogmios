import React, { Component } from 'react';
import Typography from 'material-ui/Typography';
import DeleteIcon from 'material-ui-icons/Delete';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { IconButton } from 'material-ui';
import { isEqual } from 'lodash';
import {
  ListItem, ListItemText, ListItemSecondaryAction
} from 'material-ui/List';

import { projectKeysRemove } from '../actions/keys';

class KeyItem extends Component {
  shouldComponentUpdate(newProps) {
    return !isEqual(newProps.item, this.props.item);
  }

  removeKey() {
    const { projectKeysRemove, item, project, token } = this.props;
    projectKeysRemove(token, [ item ], project._id);
  }

  render() {
    const { item } = this.props;
    return (
        <ListItem>
          <ListItemText primary={
            <Typography type="body2">
              {item}
            </Typography>
          } />
          <ListItemSecondaryAction>
            <IconButton onClick={this.removeKey.bind(this)}><DeleteIcon /></IconButton>
          </ListItemSecondaryAction>
        </ListItem>
    );
  }
}

const mapStateToProps = (state) => ({
  project: state.project.item,
  token: state.auth.token
});

const mapDispatchToProps = {
  projectKeysRemove
};


export default connect(mapStateToProps, mapDispatchToProps)(translate()(KeyItem));

