import React, { Component } from 'react';
import ClearIcon from 'material-ui-icons/Clear'
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { ListItem } from 'material-ui/List';
import { divide, filter, has } from 'lodash';
import { IconButton, LinearProgress } from 'material-ui';

import { projectLocalesRemove } from '../actions/locales';

class LocaleItem extends Component {
  removeLocale() {
    const { projectLocalesRemove, item, project } = this.props;
    projectLocalesRemove(item, project._id);
  }

  render() {
    const { item, keys } = this.props;
    const localeKeys = item.keys || {};
    const okKeys = filter(keys, key => has(localeKeys, key));
    return (
      <ListItem rightIcon={<IconButton onClick={this.removeLocale.bind(this)}><ClearIcon /></IconButton>}>
        <h3>{item.code}</h3>
        <LinearProgress mode="determinate" value={divide(okKeys.length / keys.length * 100)} />
      </ListItem>
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


