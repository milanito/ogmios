import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { reduxForm, Field, reset } from 'redux-form';
import { AutoComplete } from 'material-ui';
import { findIndex, isEqual, filter } from 'lodash';

import {} from '../actions/clients';

const dataSourceConfig = {
  text: 'name',
  value: '_id'
};

const renderField = ({ input, type, label, meta: { touched, error }, projects, client, onACSubmit }) => (
  <AutoComplete hintText={label}
    floatingLabelText={label}
    dataSource={filter(projects,
      proj => isEqual(findIndex(client.projects,
        project => isEqual(project._id, proj._id)), -1))}
    type={type}
    dataSourceConfig={dataSourceConfig}
    onNewRequest={onACSubmit}
    errorText={touched && error}
    {...input}
    />
);

class AddProjectClientForm extends Component {
  constructor(props) {
    super(props);

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(props) {
    // this.props.clientAddProject(props, this.props.client._id);
  }

  render() {
    const { handleSubmit, t, projects, client } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit(this.handleFormSubmit)}>
          <Field name="project" component={renderField} type="text"
            projects={projects}
            client={client}
            label={t('CLIENT.placeholderNewClient')}
            onACSubmit={handleSubmit(this.handleFormSubmit)} />
        </form>
      </div>
    )
  }
}

function validate(formProps, props) {
  const errors = {};

  if(!formProps.project) {
    errors.project = 'project is required'
  }

  const idx = findIndex(props.client.projects,
    ({ _id }) => isEqual(_id, formProps.project));

  if (idx > -1) {
    errors.project = 'project already exists'
  }

  return errors;
}

function onSubmitSuccess(result, dispatch) {
  dispatch(reset('addProject'));
}

const mapStateToProps = (state) => ({
  client: state.client.items,
  projects: state.projects.list,
});

AddProjectClientForm = reduxForm({ form: 'addProject', validate, onSubmitSuccess })(AddProjectClientForm);

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(translate()(AddProjectClientForm));




