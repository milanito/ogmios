import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import ClearIcon from 'material-ui-icons/Clear';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';

import CreateProjectKeyForm from './CreateProjectKeyForm';
import { projectKeysRemove } from '../actions/keys';

class HeaderKeys extends Component {
  deleteAll() {
    return this.props.projectKeysRemove(this.props.token, this.props.keys, this.props.project._id);
  }

  render() {
    const { keys, t } = this.props;
    return (
      <Grid container direction="row">
        <Grid item xs>
          <Typography type="headline">
            {t('PROJECT.totalKeys')} {keys.length}
          </Typography>
        </Grid>
        <Grid item xs>
          <CreateProjectKeyForm />
        </Grid>
        <Grid item xs>
          <IconButton onClick={this.deleteAll.bind(this)}>
            <ClearIcon />
          </IconButton>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  project: state.project.item,
  keys: state.keys.list,
  token: state.auth.token
});

const mapDispatchToProps = {
  projectKeysRemove
};


export default connect(mapStateToProps, mapDispatchToProps)(translate()(HeaderKeys));



