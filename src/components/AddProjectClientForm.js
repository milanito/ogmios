import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import { MenuItem } from 'material-ui/Menu';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import {
  findIndex, map, isEqual, filter,
  slice, trim, lowerCase, join
} from 'lodash';

import { fetchProjects } from '../actions/projects';
import { clientAddProject } from '../actions/client';
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

const getSuggestions = (value, projects, client) => {
  const inputValue = lowerCase(trim(value));
  const inputLength = inputValue.length;

  return inputLength === 0
    ? []
    : slice(filter(projects, project =>
        isEqual(join(slice(lowerCase(project.name), 0, inputLength), ''), inputValue) &&
        isEqual(findIndex(client.projects, proj => isEqual(proj._id, project._id)), -1)),
      0, 5);
}

const getSuggestionValue = suggestion => suggestion.name;

const renderSuggestion = (suggestion, { query, isHighlighted }) => {
  const matches = match(suggestion.name, query);
  const parts = parse(suggestion.name, matches);
  return (
    <MenuItem selected={isHighlighted} component="div">
      {map(parts, (part, index) => {
        return part.highlight ? (
          <span key={index} style={{ fontWeight: 300 }}>
            {part.text}
          </span>
        ) : (
          <strong key={index} style={{ fontWeight: 500 }}>
            {part.text}
          </strong>
        );
      })}
    </MenuItem>
  );
}

const renderSuggestionsContainer = (options) => {
  const { containerProps, children  } = options;

  return (
    <Paper {...containerProps} square style={suggestChoiceContainer}>
      {children}
    </Paper>
  );
};

class AddProjectClientForm extends Component {
  constructor(props) {
    super(props);

    this.state = { projectname: '', suggestions: [] };
  }

  componentDidMount() {
    this.props.fetchProjects(this.props.token);
  }

  handleSuggestionsFetchRequested() {
    const { projects, client } = this.props;
    return ({ value }) => {
      this.setState({
        suggestions: getSuggestions(value, projects, client),
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
      this.props.clientAddProject(this.props.token, this.props.client.id, suggestion._id);
      this.setState({ projectname: '' });
    };
  }

  render() {
    const { t } = this.props;
    const inputProps = {
      placeholder: t('CLIENT.placeholderNewProject'),
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
  client: state.client.item,
  projects: state.projects.list,
  token: state.auth.token
});

const mapDispatchToProps = {
  fetchProjects,
  clientAddProject
};

export default connect(mapStateToProps, mapDispatchToProps)(translate()(AddProjectClientForm));




