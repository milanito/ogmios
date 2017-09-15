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

import { fetchAllUsers } from '../actions/users';
import { projectUsersAdd } from '../actions/project';
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

const getSuggestions = (value, users, project) => {
  const inputValue = lowerCase(trim(value));
  const inputLength = inputValue.length;

  return inputLength === 0
    ? []
    : slice(filter(users, user =>
        isEqual(join(slice(lowerCase(user.email), 0, inputLength), ''), inputValue) &&
        isEqual(findIndex(project.users, usr => isEqual(user._id, usr._id)), -1)),
      0, 5);
}

const getSuggestionValue = suggestion => suggestion.email;

const renderSuggestion = (suggestion, { query, isHighlighted }) => {
  const matches = match(suggestion.email, query);
  const parts = parse(suggestion.email, matches);
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

class AddUserProjectForm extends Component {
  constructor(props) {
    super(props);

    this.state = { email: '', suggestions: [] };
  }

  componentDidMount() {
    this.props.fetchAllUsers(this.props.token);
  }

  handleSuggestionsFetchRequested() {
    const { users, project } = this.props;
    return ({ value }) => {
      this.setState({
        suggestions: getSuggestions(value, users, project),
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
      this.setState({ email: newValue });
    };
  }

  selectValue() {
    return (event, { suggestion }) => {
      this.setState({ projectname: suggestion.name });
      this.props.projectUsersAdd(this.props.token, this.props.project._id, {
        user: suggestion._id,
        role: 'normal'
      });
      this.setState({ email: '' });
    };
  }

  render() {
    const { t } = this.props;
    const inputProps = {
      placeholder: t('PROJECT.placeholderNewUser'),
      value: this.state.email,
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
  project: state.project.item,
  users: state.users.list,
  token: state.auth.token
});

const mapDispatchToProps = {
  fetchAllUsers,
  projectUsersAdd
};

export default connect(mapStateToProps, mapDispatchToProps)(translate()(AddUserProjectForm));
