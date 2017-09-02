import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';

class Home extends Component {
  render() {
    const { t } = this.props;
    return (
      <div>
        <h1>{t('HOME.title')}</h1>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = {
};


export default connect(mapStateToProps, mapDispatchToProps)(translate()(Home));
