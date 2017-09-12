import React, { Component } from 'react';
import Card from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { Link } from 'react-router-dom';

class NotFound extends Component {
  render() {
    const { t } = this.props;
    return (
      <Card>
        <Grid container direction="column">
          <Grid item xs>
            <Typography type="title">
              {t('NOTFOUND.title')}
            </Typography>
          </Grid>
          <Grid item xs>
            <Link to="/projects">
              <Typography type="subheading">
                {t('NOTFOUND.homeLink')}
              </Typography>
            </Link>
          </Grid>
        </Grid>
      </Card>
    );
  }
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = {
};


export default connect(mapStateToProps, mapDispatchToProps)(translate()(NotFound));

