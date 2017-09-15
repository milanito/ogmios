import React, { Component } from 'react';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';

import CreateProjectLocaleForm from './CreateProjectLocaleForm';

class HeaderLocales extends Component {
  render() {
    const { locales, t } = this.props;
    return (
      <Grid container direction="row">
        <Grid item xs>
          <Typography type="headline">
            {t('PROJECT.totalLocales')} {locales.length}
          </Typography>
        </Grid>
        <Grid item xs>
          <CreateProjectLocaleForm />
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  project: state.project.item,
  locales: state.locales.list
});

const mapDispatchToProps = {
};


export default connect(mapStateToProps, mapDispatchToProps)(translate()(HeaderLocales));


