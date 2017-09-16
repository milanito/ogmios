import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import { MenuItem } from 'material-ui/Menu';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import {
  map, filter,
  slice
} from 'lodash';

import { suggestChoiceContainer } from '../styles/common';

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

const getSuggestions = (value, projects) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0
    ? []
    : slice(filter(projects, project =>
        project.name.toLowerCase().search(inputValue) > -1),
      0, 5);
};

const renderSuggestion = (suggestion, { query, isHighlighted }) => {
  const matches = match(suggestion.name, query);
  const parts = parse(suggestion.name, matches);
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

const getSuggestionValue = suggestion => suggestion.name;

const renderSuggestionsContainer = (options) => {
  const { containerProps, children } = options;

  return (
    <Paper {...containerProps} square style={suggestChoiceContainer}>
      {children}
    </Paper>
  );
};

class ProjectShortcut extends Component {
  constructor(props) {
    super(props);

    this.state = { projectname: '', suggestions: [] };
  }

  handleSuggestionsFetchRequested() {
    const { projects } = this.props;
    return ({ value }) => {
      this.setState({
        suggestions: getSuggestions(value, projects),
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
      this.setState({ projectname: newValue });
    };
  }

  selectValue() {
    return (event, { suggestion }) => {
      this.setState({ projectname: suggestion.name });
      this.props.history.push(`/project/${suggestion._id}`);
    };
  }

  render() {
    const { t } = this.props;
    const inputProps = {
      label: t('PROJECT.gotoProject'),
      value: this.state.projectname,
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
        getSuggestionValue={getSuggestionValue}
        inputProps={inputProps} />
    )
  }
}

const mapStateToProps = (state) => ({
  projects: state.projects.list,
});

const mapDispatchToProps = {
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(translate()(ProjectShortcut)));
