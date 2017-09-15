import React, { Component } from 'react';
import Divider from 'material-ui/Divider';
import Grid from 'material-ui/Grid';
import List from 'material-ui/List';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { map } from 'lodash';

import HeaderLocales from './HeaderLocales';
import LocaleItem from './LocaleItem';

class ProjectLocales extends Component {
  render() {
    const { locales } = this.props;
    return (
      <Grid container direction="column">
        <Grid item xs>
          <HeaderLocales />
        </Grid>
        <Grid item xs>
          <Divider />
        </Grid>
        <Grid item xs>
          <List>
            {map(locales, (locale, i) => <LocaleItem key={i} item={locale} />)}
          </List>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  project: state.project.item,
  locales: state.locales.list
});

const mapDispatchToProps = {
};


export default connect(mapStateToProps, mapDispatchToProps)(translate()(ProjectLocales));

