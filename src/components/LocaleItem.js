import React, { Component } from 'react';
import DeleteIcon from 'material-ui-icons/Delete';
import Flag from "react-country-flag";
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { ListItem } from 'material-ui/List';
import { IconButton, LinearProgress, Divider } from 'material-ui';
import {
  divide, filter, has, get, isEmpty, last, split
} from 'lodash';

import { projectLocalesRemove } from '../actions/locales';

class LocaleItem extends Component {
  removeLocale() {
    const { projectLocalesRemove, item, project } = this.props;
    projectLocalesRemove(item, project._id);
  }

  render() {
    const { item, keys } = this.props;
    const localeKeys = item.keys || {};
    const okKeys = filter(keys, key => has(localeKeys, key) && !isEmpty(get(localeKeys, key, '')));
    return (
      <div>
        <ListItem rightIcon={<IconButton onClick={this.removeLocale.bind(this)}><DeleteIcon /></IconButton>}>
          <Flag code={last(split(item.code, '_'))} />
          <h3>{item.code}</h3>
          <LinearProgress mode="determinate" value={divide(okKeys.length / keys.length * 100)} />
        </ListItem>
        <Divider />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  project: state.project.item,
  keys: state.keys.list
});

const mapDispatchToProps = {
  projectLocalesRemove
};


export default connect(mapStateToProps, mapDispatchToProps)(translate()(LocaleItem));


