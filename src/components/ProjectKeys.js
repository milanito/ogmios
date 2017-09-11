import React, { Component } from 'react';
import Divider from 'material-ui/Divider';
import Grid from 'material-ui/Grid';
import List from 'material-ui/List';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { map, isEqual } from 'lodash';
import {
  Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle
} from 'material-ui/Toolbar';

import HeaderKeys from './HeaderKeys';
import KeyItem from './KeyItem';

class ProjectKeys extends Component {
  render() {
    const { keys, t } = this.props;
    return (
      <Grid container direction="column">
        <Grid item xs>
          <HeaderKeys />
        </Grid>
        <Grid item xs>
          <Divider />
        </Grid>
        <Grid item xs>
          <List>
            {map(keys.sort(), (key, i) => <KeyItem key={i} item={key} />)}
          </List>
        </Grid>
      </Grid>
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


