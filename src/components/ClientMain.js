import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';
import Grid from 'material-ui/Grid';
import List from 'material-ui/List';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import Snackbar from 'material-ui/Snackbar';
import CopyToClipboard from 'react-copy-to-clipboard';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import {
  get, set, isEmpty, isUndefined, map
} from 'lodash';

import ProjectCard from '../components/ProjectCard';
import AddProjectClientForm from './AddProjectClientForm';
import { clientUpdate } from '../actions/client';
import { listStyle, elementStyle } from '../styles/lists';

class ClientMain extends Component {
  constructor(props) {
    super(props);

    this.state = { name: '', notif: false };
  }


  componentWillReceiveProps(newProps) {
    this.setState({ name: get(newProps, 'client.name', '') });
  }

  updateName() {
    if (!isEmpty(this.state.name) && !isUndefined(this.props.client)) {
      this.props.clientUpdate(this.props.token, this.props.client.id,
        { name: this.state.name });
    }
  }

  updateValue() {
    return (event) => {
      this.setState(set({}, 'name', event.target.value));
    };
  }

  handleCloseNotif() {
    this.setState({ notif: false });
  }

  render() {
    const { t, client } = this.props;
    return (
      <Paper>
        <Grid container direction="column">
          <Grid item xs>
            <Grid container direction="row">
              <Grid item xs={10}>
                <TextField fullWidth
                  label={t('CLIENT.fieldName')}
                  onChange={this.updateValue()}
                  value={this.state.name}
                  type="text" />
              </Grid>
              <Grid item xs>
                <Button raised
                  onClick={this.updateName.bind(this)}>
                  {t('CLIENT.validate')}
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs>
            <Grid container direction="row">
              <Grid item xs={10}>
                <TextField fullWidth
                  label={t('CLIENT.fieldId')}
                  disabled={true}
                  value={client.id}
                  type="text" />
              </Grid>
              <Grid item xs>
                <CopyToClipboard
                  onCopy={() => this.setState({ notif: true })}
                  text={client.id}>
                  <Button raised>
                    {t('CLIENT.copy')}
                  </Button>
                </CopyToClipboard>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs>
            <Grid container direction="row">
              <Grid item xs={10}>
                <TextField fullWidth
                  label={t('CLIENT.fieldToken')}
                  disabled={true}
                  value={client.token}
                  type="text" />
              </Grid>
              <Grid item xs>
                <CopyToClipboard
                  onCopy={() => this.setState({ notif: true })}
                  text={client.token}>
                  <Button raised>
                    {t('CLIENT.copy')}
                  </Button>
                </CopyToClipboard>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Snackbar open={this.state.notif}
          autoHideDuration={2e3}
          onRequestClose={this.handleCloseNotif.bind(this)}
          message={t('CLIENT.valueCopied')} />
      </Paper>
    );
  }
}

const mapStateToProps = (state) => ({
  client: state.client.item,
  token: state.auth.token
});

const mapDispatchToProps = {
  clientUpdate
};


export default connect(mapStateToProps, mapDispatchToProps)(translate()(ClientMain));




