import React, { Component } from 'react';
import Button from 'material-ui/Button';
import ClearIcon from 'material-ui-icons/Clear'
import DeleteIcon from 'material-ui-icons/Delete'
import DoneIcon from 'material-ui-icons/Done'
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { IconButton, Divider } from 'material-ui';
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
      <div>
        <ListItem rightIcon={<IconButton onClick={this.removeKey.bind(this)}><DeleteIcon /></IconButton>}>
          <h3>{item}</h3>
          {map(locales, (locale, i) =>
            <Button key={i} label={locale.code}
              icon={has(locale.keys, item) && !isEmpty(get(locale.keys, item, '')) ? <DoneIcon /> : <ClearIcon />} />
          )}
        </ListItem>
        <Divider />
      </div>
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

