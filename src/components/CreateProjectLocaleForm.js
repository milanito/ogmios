import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import countryLanguage from 'country-language';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import { MenuItem } from 'material-ui/Menu';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import {
  findIndex, map, replace, isEqual, filter,
  slice, identity
} from 'lodash';

import { projectLocalesAdd } from '../actions/locales';
import { suggestChoiceContainer } from '../styles/common';

const suggestions = map(countryLanguage.getLocales(), suggestion =>
  replace(suggestion, /-/g, '_'));

const getSuggestions = (value, locales) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0
    ? []
    : slice(filter(suggestions, suggestion =>
        suggestion.toLowerCase().search(inputValue) > -1 &&
        isEqual(findIndex(locales, locale => isEqual(locale.code, suggestion)), -1)),
      0, 5);
};

const renderField = ({ home, value, ref, label, ...other }) => (
  <TextField fullWidth
    label={label}
    autoFocus={home}
    value={value}
    inputRef={ref}
    InputProps={{
    ...other,
    }} />
);

const renderSuggestion = (suggestion, { query, isHighlighted }) => {
  const matches = match(suggestion, query);
  const parts = parse(suggestion, matches);
  return (
    <MenuItem selected={isHighlighted} component="div">
      {map(parts, (part, index) => {
        return part.highlight ? (
          <span key={index} style={{ fontWeight: 500 }}>
            {part.text}
          </span>
        ) : (
          <strong key={index} style={{ fontWeight: 300 }}>
            {part.text}
          </strong>
        );
      })}
    </MenuItem>
  );
}

const renderSuggestionsContainer = (options) => {
  const { containerProps, children } = options;

  return (
    <Paper {...containerProps} square style={suggestChoiceContainer}>
      {children}
    </Paper>
  );
};

class CreateProjectLocaleForm extends Component {
  constructor(props) {
    super(props);

    this.state = { locale: '', suggestions: [] };
  }

  handleFormSubmit(props) {
    this.props.projectLocalesAdd(props, this.props.project._id);
  }

  handleSuggestionsFetchRequested() {
    const { locales } = this.props;
    return ({ value }) => {
      this.setState({
        suggestions: getSuggestions(value, locales),
      });
    }
  }

  handleSuggestionsClearRequested() {
    return () => {
      this.setState({
        suggestions: [],
      });
    }
  }

  onChange() {
    return (event, { newValue }) => {
      this.setState({ locale: newValue });
    };
  }

  selectValue() {
    return (event, { suggestion }) => {
      this.setState({ locale: suggestion });
      this.props.projectLocalesAdd(this.props.token, { locale: suggestion }, this.props.project._id);
      this.setState({ locale: '' });
    };
  }

  render() {
    const { t } = this.props;
    const inputProps = {
      label: t('PROJECT.placeholderNewLocale'),
      value: this.state.locale,
      onChange: this.onChange()
    };
    return (
      <Autosuggest
        renderInputComponent={renderField}
        suggestions={this.state.suggestions}
        onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested()}
        onSuggestionsClearRequested={this.handleSuggestionsClearRequested()}
        onSuggestionSelected={this.selectValue()}
        renderSuggestionsContainer={renderSuggestionsContainer}
        renderSuggestion={renderSuggestion}
        getSuggestionValue={identity}
        inputProps={inputProps} />
    )
  }
}

const mapStateToProps = (state) => ({
  project: state.project.item,
  locales: state.locales.list,
  token: state.auth.token
});

const mapDispatchToProps = {
  projectLocalesAdd
};

export default connect(mapStateToProps, mapDispatchToProps)(translate()(CreateProjectLocaleForm));



