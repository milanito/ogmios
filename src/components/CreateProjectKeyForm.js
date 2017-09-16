import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { indexOf, isEmpty } from 'lodash';
import { reduxForm, Field, reset } from 'redux-form';

import { projectKeysAdd } from '../actions/keys';

const renderField = ({ input, type, label, meta: { touched, error } }) => (
  <TextField fullWidth
    label={label}
    type={type}
    error={touched && !isEmpty(error)}
    helperText={touched && error}
    {...input}
    />
);

class CreateProjectKeyForm extends Component {
  constructor(props) {
    super(props);

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(props) {
    this.props.projectKeysAdd(this.props.token, props, this.props.project._id);
  }

  render() {
    const { handleSubmit, t } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit(this.handleFormSubmit)}>
          <Field name="key" component={renderField} type="text"
            label={t('PROJECT.placeholderNewKey')} />
        </form>
      </div>
    )
  }
}

function validate(formProps, props) {
  const errors = {};

  if(!formProps.key) {
    errors.key = 'key is required'
  }

  const idx = indexOf(props.keys, formProps.key);

  if (idx > -1) {
    errors.key = 'key already exists'
  }

  return errors;
}

function onSubmitSuccess(result, dispatch) {
  dispatch(reset('createProjectKey'));
}

const mapStateToProps = (state) => ({
  project: state.project.item,
  keys: state.keys.list,
  token: state.auth.token
});

CreateProjectKeyForm = reduxForm({ form: 'createProjectKey', validate, onSubmitSuccess })(CreateProjectKeyForm);

const mapDispatchToProps = {
  projectKeysAdd
};

export default connect(mapStateToProps, mapDispatchToProps)(translate()(CreateProjectKeyForm));


