import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { map } from 'lodash';
import { List } from 'material-ui';

import CreateProjectLocaleForm from './CreateProjectLocaleForm';
import LocaleItem from './LocaleItem';

class ProjectLocales extends Component {
  render() {
    const { locales } = this.props;
    return (
      <div>
        <CreateProjectLocaleForm />
        <h3>Total: {locales.length}</h3>
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

