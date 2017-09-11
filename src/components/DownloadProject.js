import React, { Component } from 'react';
import Menu, { MenuItem } from 'material-ui/Menu';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import moment from 'moment';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { map, set, has, isEqual, get, nth, isUndefined } from 'lodash';

import { fetchExportTypes, exportProject } from '../actions/export';


class DownloadProject extends Component {
  constructor(props) {
    super(props);

    this.state = { type: '', locale: '' };
  }

  componentDidMount() {
    this.props.fetchExportTypes(this.props.token);
  }

  handleChange(type) {
    return (event) => {
      this.setState(set({}, type, event.target.value));
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
    this.props.exportProject(this.props.token, this.props.project._id,
      get(nth(this.props.locales, this.state.locale), 'code', ''),
      nth(this.props.types, this.state.type));
  }

  clickList(event, type) {
  }

  render() {
    const { t, types, locales } = this.props;
    return (
      <Grid container direction="column" align="center">
        <Grid item xs>
          <List>
            <ListItem button
              onClick={event => this.clickList(event, 'type')}>
              <ListItemText primary={t('PROJECT.downloadTypeSelection')}
                secondary={this.state.type}/>
            </ListItem>
          </List>
          <Menu
            onChange={this.handleChange('type')}>
            {map(types, (type, i) => <MenuItem key={i} value={i} primaryText={type} />)}
          </Menu>
        </Grid>
        <Grid item xs>
          <List>
            <ListItem button
              onClick={event => this.clickList(event, 'locale')}>
              <ListItemText primary={t('PROJECT.downloadLocaleSelection')}
                secondary={this.state.locale}/>
            </ListItem>
          </List>
          <Menu
            onChange={this.handleChange('locale')}>
            {map(locales, (locale, i) => <MenuItem key={i} value={i} primaryText={locale.code} />)}
          </Menu>
        </Grid>
        <Grid item xs>
          <Button raised onClick={this.handleSubmit.bind(this)}>
            {t('PROJECT.validate')}
          </Button>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  project: state.project.item,
  types: state.export.types,
  data: state.export.data,
  locales: state.locales.list,
  token: state.auth.token
});

const mapDispatchToProps = {
  fetchExportTypes,
  exportProject
};

export default connect(mapStateToProps, mapDispatchToProps)(translate()(DownloadProject));



