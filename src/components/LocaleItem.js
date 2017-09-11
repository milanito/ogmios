import React, { Component } from 'react';
import DeleteIcon from 'material-ui-icons/Delete';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import Flag from 'react-country-flag';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import {
  ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction
} from 'material-ui/List';
import {
  divide, filter, has, get, isEmpty, last, split, join, round
} from 'lodash';

import { projectLocalesRemove } from '../actions/locales';

class LocaleItem extends Component {
  removeLocale() {
    const { projectLocalesRemove, item, project, token } = this.props;
    projectLocalesRemove(token, item, project._id);
  }

  render() {
    const { item, keys } = this.props;
    const localeKeys = item.keys || {};
    const okKeys = filter(keys, key => has(localeKeys, key) && !isEmpty(get(localeKeys, key, '')));
    return (
      <ListItem>
        <ListItemIcon>
          <Flag svg code={last(split(item.code, '_'))} />
        </ListItemIcon>
        <ListItemText
          primary={item.code}
          secondary={join([round(divide(okKeys.length / keys.length * 100), 2), '%'], ' ')}/>
        <ListItemSecondaryAction>
          <IconButton onClick={this.removeLocale.bind(this)}><DeleteIcon /></IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}

const mapStateToProps = (state) => ({
  project: state.project.item,
  keys: state.keys.list,
  token: state.auth.token
});

const mapDispatchToProps = {
  projectLocalesRemove
};


export default connect(mapStateToProps, mapDispatchToProps)(translate()(LocaleItem));


