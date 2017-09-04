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
import {
  map, get, find, isEqual, reduce, filter,
  uniq, union, isEmpty
} from 'lodash';

import TranslationLine from './TranslationLine';


class TranslationsList extends Component {
  render() {
    const { keys, locales, localeOne, localeTwo, t, visible } = this.props;
    let realKeys = keys.sort();
    if (!visible) {
      realKeys = reduce([localeOne, localeTwo], (total, code) => {
        const locale = find(locales, lcl => isEqual(lcl.code, code));
        if (!locale) {
          return total;
        }

        return uniq(union(total, filter(keys,
          key => isEmpty(get(get(locale, 'keys', {}), key, '')))));
      }, []).sort();
    }
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
          {map(realKeys, (key, i) => <TranslationLine key={i} translationKey={key} localeOne={localeOne} localeTwo={localeTwo} />)}
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


