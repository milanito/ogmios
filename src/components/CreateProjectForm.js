import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { reduxForm, Field, reset } from 'redux-form';
import { isEmpty, findIndex, isEqual } from 'lodash';

import { projectsAdd } from '../actions/projects';

const renderField = ({ input, type, label, meta: { touched, error } }) => (
  <TextField label={label}
    type={type}
    error={touched && !isEmpty(error)}
    helperText={touched && error}
    {...input}
    />
);

class CreateProjectForm extends Component {
  constructor(props) {
    super(props);

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(props) {
    this.props.projectsAdd(this.props.token, props);
  }

  render() {
    const { handleSubmit, t } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit)}>
        <Grid container direction="column" align="center">
          <Grid item xs>
            <Field name="name" component={renderField} type="text"
              label={t('PROJECTS.placeholderName')} />
          </Grid>
          <Grid item xs>
            <Button raised type="submit">{t('PROJECT.validate')}</Button>
          </Grid>
        </Grid>
      </form>
    )
  }
}

function validate(formProps, props) {
  const errors = {};
  const { projects } = props;

  if(!formProps.name) {
    errors.name = 'Name is required'
  }

  const idx = findIndex(projects,
    project => isEqual(project.name, formProps.name));

  if (idx > -1) {
    errors.name = 'Project already exists';
  }

  return errors;
}

function onSubmitSuccess(result, dispatch) {
  dispatch(reset('createProject'));
}

const mapStateToProps = (state) => ({
  token: state.auth.token,
  projects: state.projects.list
});

CreateProjectForm = reduxForm({ form: 'createProject', validate, onSubmitSuccess })(CreateProjectForm);

const mapDispatchToProps = {
  projectsAdd
};

export default connect(mapStateToProps, mapDispatchToProps)(translate()(CreateProjectForm));

