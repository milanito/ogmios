import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { SelectField, MenuItem, RaisedButton } from 'material-ui';
import { map, set, has, isEqual, get, nth, isUndefined } from 'lodash';

import { fetchExportTypes, exportProject } from '../actions/export';


class DownloadProject extends Component {
  constructor(props) {
    super(props);

    this.state = { type: '', locale: '' };
  }

  componentDidMount() {
    this.props.fetchExportTypes();
  }

  handleChange(type) {
    return (event, value) => {
      this.setState(set({}, type, value));
    };
  }

  componentWillReceiveProps(newProps) {
    if (has(newProps, 'data') && !isUndefined(newProps.data) && !isEqual(get(newProps, 'data', null), this.props.data)) {
      let file;
      const typeName = nth(this.props.types, this.state.type);
      const element = document.createElement("a");
      if (isEqual(typeName, 'json') || isEqual(typeName, 'flatjson')) {
        file = new Blob([JSON.stringify(newProps.data, null, 2)], {type: 'text/plain'});
      } else {
        file = new Blob([newProps.data], {type: 'text/plain'});
      }
      element.href = URL.createObjectURL(file);

      if (isEqual(typeName, 'json') || isEqual(typeName, 'flatjson')) {
        element.download = `${this.props.project.name}-export-${moment().toString()}.json`;
      } else if (isEqual(typeName, 'csv')) {
        element.download = `${this.props.project.name}-export-${moment().toString()}.csv`;
      } else if (isEqual(typeName, 'android')) {
        element.download = `${this.props.project.name}-export-${moment().toString()}.xml`;
      } else if (isEqual(typeName, 'yaml')) {
        element.download = `${this.props.project.name}-export-${moment().toString()}.yaml`;
      } else if (isEqual(typeName, 'apple')) {
        element.download = `${this.props.project.name}-export-${moment().toString()}.txt`;
      }
      element.click();
    }
  }

  handleSubmit() {
    this.props.exportProject(this.props.project._id,
      get(nth(this.props.locales, this.state.locale), 'code', ''),
      nth(this.props.types, this.state.type));
  }

  render() {
    const { t, types, locales } = this.props;
    return (
      <div>
        <SelectField
          floatingLabelText={t('PROJECT.selectDownload')}
          value={this.state.type}
          onChange={this.handleChange('type')}>
          {map(types, (type, i) => <MenuItem key={i} value={i} primaryText={type} />)}
        </SelectField>
        <SelectField
          floatingLabelText={t('PROJECT.selectLocale')}
          value={this.state.locale}
          onChange={this.handleChange('locale')}>
          {map(locales, (locale, i) => <MenuItem key={i} value={i} primaryText={locale.code} />)}
        </SelectField>
        <RaisedButton onClick={this.handleSubmit.bind(this)}label={t('PROJECT.validate')} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  project: state.project.item,
  types: state.export.types,
  data: state.export.data,
  locales: state.locales.list
});

const mapDispatchToProps = {
  fetchExportTypes,
  exportProject
};

export default connect(mapStateToProps, mapDispatchToProps)(translate()(DownloadProject));



