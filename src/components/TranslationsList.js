import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import Table, {
  TableBody, TableCell, TableHead, TableRow
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
        <TableHead>
          <TableRow>
            <TableCell>{t('PROJECT.translationsKeys')}</TableCell>
            <TableCell>{get(find(locales,
              locale => isEqual(locale.code, localeOne)), 'code', '')}</TableCell>
            <TableCell>{get(find(locales,
              locale => isEqual(locale.code, localeTwo)), 'code', '')}</TableCell>
            <TableCell>{t('PROJECT.translationsActions')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
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
  visible: state.translations.visible,
  localeOne: state.translations.localeOne,
  localeTwo: state.translations.localeTwo
});

const mapDispatchToProps = {
};


export default connect(mapStateToProps, mapDispatchToProps)(translate()(TranslationsList));


