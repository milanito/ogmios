import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
} from 'material-ui/Table';
import { map, get, find, isEqual } from 'lodash';

import TranslationLine from './TranslationLine';


class TranslationsList extends Component {
  render() {
    const { keys, locales, localeOne, localeTwo, t } = this.props;
    return (
      <Table>
        <TableHeader displaySelectAll={false}>
          <TableRow>
            <TableHeaderColumn>{t('PROJECT.translationsKeys')}</TableHeaderColumn>
            <TableHeaderColumn>{get(find(locales,
              locale => isEqual(locale.code, localeOne)), 'code', '')}</TableHeaderColumn>
            <TableHeaderColumn>{get(find(locales,
              locale => isEqual(locale.code, localeTwo)), 'code', '')}</TableHeaderColumn>
            <TableHeaderColumn>{t('PROJECT.translationsActions')}</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {map(keys, (key, i) => <TranslationLine key={i} translationKey={key} localeOne={localeOne} localeTwo={localeTwo} />)}
        </TableBody>
      </Table>
    );
  }
}

const mapStateToProps = (state) => ({
  project: state.project.item,
  locales: state.locales.list,
  keys: state.keys.list,
});

const mapDispatchToProps = {
};


export default connect(mapStateToProps, mapDispatchToProps)(translate()(TranslationsList));


