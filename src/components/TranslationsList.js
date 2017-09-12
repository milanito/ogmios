import React, { Component } from 'react';
import Flag from 'react-country-flag';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import Table, {
  TableBody, TableCell, TableHead, TableRow
} from 'material-ui/Table';
import {
  map, get, find, isEqual, reduce, filter,
  uniq, union, isEmpty, last, split
} from 'lodash';

import TranslationLine from './TranslationLine';


class TranslationsList extends Component {
  shouldComponentUpdate(newProps) {
    const { keys, locales, localeOne, localeTwo, visible } = this.props;

    return !isEqual(newProps.keys.sort(), keys.sort()) ||
      !isEqual(newProps.locales.sort(), locales.sort()) ||
      !isEqual(newProps.localeOne, localeOne) ||
      !isEqual(newProps.localeTwo, localeTwo) ||
      !isEqual(newProps.visible, visible);
  }

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
            <TableCell>
              <Typography type="body2">
                {t('PROJECT.translationsKeys')}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography type="body2">
                {localeOne && <Flag svg code={last(split(localeOne, '_'))} />}
                {localeOne}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography type="body2">
                {localeTwo && <Flag svg code={last(split(localeTwo, '_'))} />}
                {localeTwo}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography type="body2">
                {t('PROJECT.translationsActions')}
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {map(realKeys, key =>
            <TranslationLine key={key}
              translationKey={key}
              localeOne={localeOne}
              localeTwo={localeTwo} />)}
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


