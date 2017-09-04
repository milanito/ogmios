import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { map } from 'lodash';
import { List } from 'material-ui';
import {
  Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle
} from 'material-ui/Toolbar';

import CreateProjectLocaleForm from './CreateProjectLocaleForm';
import LocaleItem from './LocaleItem';

class ProjectLocales extends Component {
  render() {
    const { locales, t } = this.props;
    return (
      <div>
        <Toolbar>
          <ToolbarGroup>
            <ToolbarTitle text={t('PROJECT.totalLocales')} />
            <ToolbarTitle text={locales.length} />
            <ToolbarSeparator />
          </ToolbarGroup>
          <ToolbarGroup>
            <CreateProjectLocaleForm />
          </ToolbarGroup>
        </Toolbar>
        <List>
          {map(locales, (locale, i) => <LocaleItem key={i} item={locale} />)}
        </List>
      </div>
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

