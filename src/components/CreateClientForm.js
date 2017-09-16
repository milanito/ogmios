import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { reduxForm, Field, reset } from 'redux-form';
import { isEmpty, findIndex, isEqual } from 'lodash';

import { clientsAdd } from '../actions/clients';

const renderField = ({ input, type, label, meta: { touched, error } }) => (
  <TextField label={label}
    type={type}
    error={touched && !isEmpty(error)}
    helperText={touched && error}
    {...input}
    />
);

class CreateClientForm extends Component {
  constructor(props) {
    super(props);

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(props) {
    this.props.clientsAdd(this.props.token, props);
  }

  render() {
    const { handleSubmit, t } = this.props;
    return (
        <form onSubmit={handleSubmit(this.handleFormSubmit)}>
          <Grid container direction="column" align="center">
            <Grid item xs>
              <Field name="name" component={renderField} type="text"
                label={t('CLIENTS.placeholderName')} />
            </Grid>
            <Grid item xs>
              <Button raised type="submit">{t('CLIENT.validate')}</Button>
            </Grid>
          </Grid>
        </form>
    )
  }
}

function validate(formProps, props) {
  const errors = {};
  const { clients } = props;

  if(!formProps.name) {
    errors.name = 'Name is required'
  }

  const idx = findIndex(clients,
    client => isEqual(client.name, formProps.name));

  if (idx > -1) {
    errors.name = 'Client already exists';
  }

  return errors;
}

function onSubmitSuccess(result, dispatch) {
  dispatch(reset('createClient'));
}

const mapStateToProps = (state) => ({
  token: state.auth.token,
  clients: state.clients.list
});

CreateClientForm = reduxForm({ form: 'createClient', validate, onSubmitSuccess })(CreateClientForm);

const mapDispatchToProps = {
  clientsAdd
};

export default connect(mapStateToProps, mapDispatchToProps)(translate()(CreateClientForm));
