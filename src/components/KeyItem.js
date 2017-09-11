import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import ClearIcon from 'material-ui-icons/Clear';
import DeleteIcon from 'material-ui-icons/Delete';
import DoneIcon from 'material-ui-icons/Done';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { IconButton, Divider } from 'material-ui';
import { map, has, isEmpty, get } from 'lodash';
import {
  ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction
} from 'material-ui/List';

import { projectKeysRemove } from '../actions/keys';

class KeyItem extends Component {
  removeKey() {
    const { projectKeysRemove, item, project, token } = this.props;
    projectKeysRemove(token, item, project._id);
  }

  render() {
    const { item, locales } = this.props;
    return (
      <div>
        <ListItem>
          <ListItemText primary={
            <Typography type="body2">
              {item}
            </Typography>
          } />
          {map(locales, (locale, i) =>
            <ListItemText key={i} primary={locale.code}
              secondary={has(locale.keys, item) && !isEmpty(get(locale.keys, item, '')) ? <DoneIcon /> : <ClearIcon />} />
          )}
          <ListItemSecondaryAction>
            <IconButton onClick={this.removeKey.bind(this)}><DeleteIcon /></IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <Divider />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  project: state.project.item,
  locales: state.locales.list,
  token: state.auth.token
});

const mapDispatchToProps = {
  projectKeysRemove
};


export default connect(mapStateToProps, mapDispatchToProps)(translate()(KeyItem));

