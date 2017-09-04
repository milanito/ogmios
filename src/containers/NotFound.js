import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Card } from 'material-ui';

class NotFound extends Component {
  render() {
    const { t } = this.props;
    return (
      <Card>
        <h1>{t('NOTFOUND.title')}</h1>
        <Link to="/">{t('NOTFOUND.homeLink')}</Link>
      </Card>
    );
  }
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = {
};


export default connect(mapStateToProps, mapDispatchToProps)(translate()(NotFound));

