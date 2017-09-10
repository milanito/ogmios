import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { reduxForm, Field, reset } from 'redux-form';
import { findIndex, isEqual, filter } from 'lodash';

import {} from '../actions/clients';

const getSuggestionValue = suggestion => suggestion.name;

class AddProjectClientForm extends Component {
  constructor(props) {
    super(props);

    this.state = { project: {} };
  }

  onChange(props) {
    // this.props.clientAddProject(props, this.props.client._id);
  }

  renderSuggestion(suggestion) {
    return (
      <div>
          {suggestion.name}
      </div>
    );
  }

  render() {
    const { handleSubmit, t, projects, client } = this.props;
    const inputProps = {
      placeholder: t('CLIENT.placeholderNewProject'),
      value: this.state.project,
      onChange: this.onChange
    };
    return (
      <Autosuggest
        suggestions={projects}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={this.renderSuggestion.bind(this)}
        inputProps={inputProps} />
    )
  }
}

const mapStateToProps = (state) => ({
  client: state.client.items,
  projects: state.projects.list,
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(translate()(AddProjectClientForm));




