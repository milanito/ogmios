import React, { Component } from 'react';
import DoneIcon from 'material-ui-icons/Done';
import ClearIcon from 'material-ui-icons/Clear';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { TextField, IconButton } from 'material-ui';
import {
    TableRow,
    TableRowColumn,
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
      <TableRowColumn>
        <TextField
          name={name}
          onChange={this.updateValue(name)}
          value={this.state[name]} />
      </TableRowColumn>
    )
  }

  updateValue(key) {
    return (event, value) => {
      this.setState(set({}, key, value));
    }
  }

  clearKeyLocales() {
    const { localeOne, localeTwo, translationKey, project } = this.props;

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

    this.props.projectLocalesMultipleUpdate(locs, project._id);
  }

  saveKeyLocales() {
    const { localeOne, localeTwo, translationKey, project } = this.props;
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

    this.props.projectLocalesMultipleUpdate(locs, project._id);
  }

  render() {
    const { localeOne, localeTwo, translationKey } = this.props;
    return (
      <TableRow>
        <TableRowColumn>{translationKey}</TableRowColumn>
        { !isEmpty(localeOne) ? this.renderColumn('firstValue') : <TableRowColumn /> }
        { !isEmpty(localeTwo) ? this.renderColumn('secondValue') : <TableRowColumn /> }
        <TableRowColumn>
          <IconButton onClick={this.saveKeyLocales.bind(this)}><DoneIcon /></IconButton>
          <IconButton onClick={this.clearKeyLocales.bind(this)}><ClearIcon /></IconButton>
        </TableRowColumn>
      </TableRow>
    )
  }
}

const mapStateToProps = (state) => ({
  project: state.project.item,
  locales: state.locales.list,
});

const mapDispatchToProps = {
  projectLocalesUpdate,
  projectLocalesMultipleUpdate,
};


export default connect(mapStateToProps, mapDispatchToProps)(translate()(TranslationLine));



