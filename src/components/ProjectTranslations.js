import React, { Component } from 'react';
import Divider from 'material-ui/Divider';
import Grid from 'material-ui/Grid';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { map, filter, isEqual, isEmpty } from 'lodash';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

import HeaderTranslations from './HeaderTranslations';
import TranslationsList from './TranslationsList';

class ProjectLocales extends Component {
  renderTranslationsList() {
    const { localeOne, localeTwo, visible } = this.props;
    if (!isEmpty(localeOne)) {
      return (
        <TranslationsList localeOne={localeOne}
          localeTwo={localeTwo} visible={visible} />
      );
    }
    return (<div></div>);
  }

  render() {
    return (
      <Grid container direction="column">
        <Grid item xs>
          <HeaderTranslations />
        </Grid>
        <Grid item xs>
          <Divider />
        </Grid>
        <Grid item xs>
          {this.renderTranslationsList()}
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => ({
  project: state.project.item,
  locales: state.locales.list,
  localeOne: state.translations.localeOne,
  localeTwo: state.translations.localeTwo
});

const mapDispatchToProps = {
};


export default connect(mapStateToProps, mapDispatchToProps)(translate()(ProjectLocales));


