import React, { Component } from 'react';
import countryLanguage from 'country-language';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { reduxForm, Field, reset } from 'redux-form';
import { AutoComplete } from 'material-ui';
import { findIndex, map, replace, isEqual, filter } from 'lodash';

import { projectLocalesAdd } from '../actions/locales';

const renderField = ({ input, type, label, meta: { touched, error }, locales, onACSubmit }) => (
  <AutoComplete hintText={label}
    floatingLabelText={label}
    dataSource={filter(map(countryLanguage.getLocales(),
      locale => replace(locale, /-/g, '_')),
      (lcl) => isEqual(findIndex(locales, locale => isEqual(locale.code, lcl)), -1))}
    type={type}
    onNewRequest={onACSubmit}
    errorText={touched && error}
    {...input}
    />
);

class CreateProjectLocaleForm extends Component {
  constructor(props) {
    super(props);

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(props) {
    this.props.projectLocalesAdd(props, this.props.project._id);
  }

  render() {
    const { handleSubmit, t, locales } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit(this.handleFormSubmit)}>
          <Field name="locale" component={renderField} type="text" locales={locales}
            label={t('PROJECT.placeholderNewLocale')}
            onACSubmit={handleSubmit(this.handleFormSubmit)} />
        </form>
      </div>
    )
  }
}

function validate(formProps, props) {
  const errors = {};

  if(!formProps.locale) {
    errors.locale = 'locale is required'
  }

  const idx = findIndex(props.locales,
    ({ code }) => isEqual(code, formProps.locale));

  if (idx > -1) {
    errors.locale = 'locale already exists'
  }

  return errors;
}

function onSubmitSuccess(result, dispatch) {
  dispatch(reset('createProjectLocale'));
}

const mapStateToProps = (state) => ({
  project: state.project.item,
  locales: state.locales.list
});

CreateProjectLocaleForm = reduxForm({ form: 'createProjectLocale', validate, onSubmitSuccess })(CreateProjectLocaleForm);

const mapDispatchToProps = {
  projectLocalesAdd
};

export default connect(mapStateToProps, mapDispatchToProps)(translate()(CreateProjectLocaleForm));



