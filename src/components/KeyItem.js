import React, { Component } from 'react';
import ClearIcon from 'material-ui-icons/Clear'
import DoneIcon from 'material-ui-icons/Done'
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { IconButton, FlatButton } from 'material-ui';
import { ListItem } from 'material-ui/List';
import { map, has, isEmpty, get } from 'lodash';

import { projectKeysRemove } from '../actions/keys';

class KeyItem extends Component {
  removeKey() {
    const { projectKeysRemove, item, project } = this.props;
    projectKeysRemove(item, project._id);
  }

  render() {
    const { item, locales } = this.props;
    return (
      <ListItem rightIcon={<IconButton onClick={this.removeKey.bind(this)}><ClearIcon /></IconButton>}>
        <h3>{item}</h3>
        {map(locales, (locale, i) =>
          <FlatButton key={i} label={locale.code}
            icon={has(locale.keys, item) && !isEmpty(get(locale.keys, item, '')) ? <DoneIcon /> : <ClearIcon />} />
        )}
      </ListItem>
    );
  }
}

const mapStateToProps = (state) => ({
  project: state.project.item,
  locales: state.locales.list
});

const mapDispatchToProps = {
  projectKeysRemove
};


export default connect(mapStateToProps, mapDispatchToProps)(translate()(KeyItem));

