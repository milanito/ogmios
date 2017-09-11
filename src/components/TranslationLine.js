import React, { Component } from 'react';
import DoneIcon from 'material-ui-icons/Done';
import ClearIcon from 'material-ui-icons/Clear';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { TextField, IconButton } from 'material-ui';
import {
  TableCell, TableRow
} from 'material-ui/Table';
import {
  get, find, isEqual, isEmpty, set, reduce
} from 'lodash';

import {
  projectLocalesUpdate,
  projectLocalesMultipleUpdate,
} from '../actions/locales';


class TranslationLine extends Component {
  constructor(props) {
    super(props);

    this.state = { firstValue: '', secondValue: '' };
  }

  componentWillReceiveProps(newProps) {
    const { locales, localeOne, localeTwo, translationKey } = newProps;
    const firstKeys = get(find(locales,
      locale => isEqual(locale.code, localeOne)), 'keys', {});
    const secondKeys = get(find(locales,
      locale => isEqual(locale.code, localeTwo)), 'keys', {});
    const firstValue = get(firstKeys, translationKey, '');
    const secondValue = get(secondKeys, translationKey, '');

    this.setState({ firstValue, secondValue });
  }

  renderColumn(name) {
    return (
      <TableCell>
        <TextField
          name={name}
          onChange={this.updateValue(name)}
          value={this.state[name]} />
      </TableCell>
    )
  }

  updateValue(key) {
    return (event) => {
      this.setState(set({}, key, event.target.value));
    }
  }

  clearKeyLocales() {
    const { localeOne, localeTwo, translationKey, project, token } = this.props;

    const locs = reduce([localeOne, localeTwo], (total, loc) => {
      if (!isEmpty(loc)) {
        const translations = {};
        translations[translationKey] = '';
        total.push({
          code: loc,
          translations
        });
      }
      return total;
    }, []);

    this.props.projectLocalesMultipleUpdate(token, locs, project._id);
  }

  saveKeyLocales() {
    const { localeOne, localeTwo, translationKey, project, token } = this.props;
    const { firstValue, secondValue } = this.state;

    const locs = reduce([
      { loc: localeOne, val: firstValue},
      { loc: localeTwo, val: secondValue }
    ], (total, {loc, val}) => {
      if (!isEmpty(loc) && !isEmpty(val)) {
        const translations = {};
        translations[translationKey] = val;
        total.push({
          code: loc,
          translations
        });
      }
      return total;
    }, []);

    if (!isEmpty(locs)) {
      this.props.projectLocalesMultipleUpdate(token, locs, project._id);
    }
  }

  render() {
    const { localeOne, localeTwo, translationKey } = this.props;
    return (
      <TableRow>
        <TableCell>{translationKey}</TableCell>
        { !isEmpty(localeOne) ? this.renderColumn('firstValue') : <TableCell></TableCell> }
        { !isEmpty(localeTwo) ? this.renderColumn('secondValue') : <TableCell></TableCell> }
        <TableCell>
          <IconButton onClick={this.saveKeyLocales.bind(this)}><DoneIcon /></IconButton>
          <IconButton onClick={this.clearKeyLocales.bind(this)}><ClearIcon /></IconButton>
        </TableCell>
      </TableRow>
    )
  }
}

const mapStateToProps = (state) => ({
  project: state.project.item,
  locales: state.locales.list,
  token: state.auth.token,
  localeOne: state.translations.localeOne,
  localeTwo: state.translations.localeTwo
});

const mapDispatchToProps = {
  projectLocalesUpdate,
  projectLocalesMultipleUpdate,
};


export default connect(mapStateToProps, mapDispatchToProps)(translate()(TranslationLine));



