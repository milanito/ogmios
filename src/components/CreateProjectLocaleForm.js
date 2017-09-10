import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import countryLanguage from 'country-language';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { reduxForm, Field, reset } from 'redux-form';
import { AutoComplete } from 'material-ui';
import { findIndex, map, replace, isEqual, filter } from 'lodash';

import { projectLocalesAdd } from '../actions/locales';

const getSuggestionValue = suggestion => replace(suggestion, /-/g, '_');

class CreateProjectLocaleForm extends Component {
  constructor(props) {
    super(props);

    this.state = { locale: '' };
  }

  handleFormSubmit(props) {
    this.props.projectLocalesAdd(props, this.props.project._id);
  }

  renderSuggestion(suggestion) {
    return (
      <div>
          {replace(suggestion, /-/g, '_')}
      </div>
    );
  }

  render() {
    const { handleSubmit, t, locales } = this.props;
    const inputProps = {
      placeholder: t('PROJECT.placeholderNewLocale'),
      value: this.state.locale,
      onChange: this.onChange
    };
    return (
      <Autosuggest
        suggestions={countryLanguage.getLocales()}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={this.renderSuggestion.bind(this)}
        inputProps={inputProps} />
    )
  }
}

const mapStateToProps = (state) => ({
  project: state.project.item,
  locales: state.locales.list
});

const mapDispatchToProps = {
  projectLocalesAdd
};

export default connect(mapStateToProps, mapDispatchToProps)(translate()(CreateProjectLocaleForm));



