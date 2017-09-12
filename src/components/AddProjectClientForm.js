import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import { MenuItem } from 'material-ui/Menu';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { reduxForm, Field, reset } from 'redux-form';
import {
  findIndex, map, replace, isEqual, filter, isEmpty,
  slice, identity
} from 'lodash';

import { fetchProjects } from '../actions/projects';
import {} from '../actions/clients';

const renderField = ({ home, value, ref, label, ...other }) => (
  <TextField
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
        isEqual(project.name.toLowerCase().slice(0, inputLength), inputValue)),
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
    <Paper {...containerProps} square>
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
      this.setState({ projectname: suggestion });
      // this.props.clientAddProject(props, this.props.client._id);
      // this.setState({ projectname: '' });
    };
  }

  render() {
    const { t, projects, client } = this.props;
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
  client: state.client.items,
  projects: state.projects.list,
  token: state.auth.token
});

const mapDispatchToProps = {
  fetchProjects,
};

export default connect(mapStateToProps, mapDispatchToProps)(translate()(AddProjectClientForm));




