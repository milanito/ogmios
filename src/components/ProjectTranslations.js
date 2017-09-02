import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';


class ProjectLocales extends Component {
  render() {
    const { locales, keys } = this.props;
    return (
      <div>
        <label>Total locales : {locales.length}</label>
        <label>Total keys : {keys.length}</label>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  project: state.project.item,
  locales: state.locales.list,
  keys: state.keys.list,
});

const mapDispatchToProps = {
};


export default connect(mapStateToProps, mapDispatchToProps)(translate()(ProjectLocales));


