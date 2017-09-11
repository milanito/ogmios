import React, { Component } from 'react';
import Divider from 'material-ui/Divider';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { map } from 'lodash';

import CreateProjectKeyForm from './CreateProjectKeyForm';

class HeaderKeys extends Component {
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
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  project: state.project.item,
  keys: state.keys.list
});

const mapDispatchToProps = {
};


export default connect(mapStateToProps, mapDispatchToProps)(translate()(HeaderKeys));



