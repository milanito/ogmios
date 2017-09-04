import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { reduxForm, Field, reset } from 'redux-form';
import { TextField, RaisedButton } from 'material-ui';

import { projectsAdd } from '../actions/projects';

const renderField = ({ input, type, label, meta: { touched, error } }) => (
  <TextField hintText={label}
    floatingLabelText={label}
    type={type}
    errorText={touched && error}
    {...input}
    />
);

class CreateProjectForm extends Component {
  constructor(props) {
    super(props);

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(props) {
    this.props.projectsAdd(props);
  }

  render() {
    const { handleSubmit, t } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit(this.handleFormSubmit)}>
          <Field name="name" component={renderField} type="text"
            label={t('PROJECT.placeholderName')} />
          <br />
          <RaisedButton type="submit" label={t('PROJECT.validate')} />
        </form>
      </div>
    )
  }
}

function validate(formProps) {
  const errors = {};

  if(!formProps.name) {
    errors.name = 'name is required'
  }

  return errors;
}

function onSubmitSuccess(result, dispatch) {
  dispatch(reset('createProject'));
}

const mapStateToProps = (state) => ({
});

CreateProjectForm = reduxForm({ form: 'createProject', validate, onSubmitSuccess })(CreateProjectForm);

const mapDispatchToProps = {
  projectsAdd
};

export default connect(mapStateToProps, mapDispatchToProps)(translate()(CreateProjectForm));

