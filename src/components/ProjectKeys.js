import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { List } from 'material-ui';
import { map } from 'lodash';
import {
  Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle
} from 'material-ui/Toolbar';

import CreateProjectKeyForm from './CreateProjectKeyForm';
import KeyItem from './KeyItem';

class ProjectKeys extends Component {
  render() {
    const { keys, t } = this.props;
    return (
      <div>
        <Toolbar>
          <ToolbarGroup>
            <ToolbarTitle text={t('PROJECT.totalKeys')} />
            <ToolbarTitle text={keys.length} />
            <ToolbarSeparator />
          </ToolbarGroup>
          <ToolbarGroup>
            <CreateProjectKeyForm />
          </ToolbarGroup>
        </Toolbar>
        <List>
          {map(keys.sort(), (key, i) => <KeyItem key={i} item={key} />)}
        </List>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  project: state.project.item,
  keys: state.keys.list
});

const mapDispatchToProps = {
};


export default connect(mapStateToProps, mapDispatchToProps)(translate()(ProjectKeys));


