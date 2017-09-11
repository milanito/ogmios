import React, { Component } from 'react';
import Menu, { MenuItem } from 'material-ui/Menu';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import moment from 'moment';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import {
  map, set, has, isEqual, get, nth, isUndefined, merge
} from 'lodash';

import { fetchExportTypes, exportProject } from '../actions/export';


class DownloadProject extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: '', locale: '', opentype: false, openlocale: false, anchorEl: null
    };
  }

  componentDidMount() {
    this.props.fetchExportTypes(this.props.token);
  }

  handleChange(value, type) {
    this.setState(set({}, type, value));
    this.setState(set({}, `open${type}`, false));
  }

  componentWillReceiveProps(newProps) {
    if (has(newProps, 'data') && !isUndefined(newProps.data) && !isEqual(get(newProps, 'data', null), this.props.data)) {
      let file;
      const element = document.createElement("a");
      if (isEqual(this.state.type, 'json') || isEqual(this.state.type, 'flatjson')) {
        file = new Blob([JSON.stringify(newProps.data, null, 2)], {type: 'text/plain'});
      } else {
        file = new Blob([newProps.data], {type: 'text/plain'});
      }
      element.href = URL.createObjectURL(file);

      if (isEqual(this.state.type, 'json') || isEqual(this.state.type, 'flatjson')) {
        element.download = `${this.props.project.name}-export-${moment().toString()}.json`;
      } else if (isEqual(this.state.type, 'csv')) {
        element.download = `${this.props.project.name}-export-${moment().toString()}.csv`;
      } else if (isEqual(this.state.type, 'android')) {
        element.download = `${this.props.project.name}-export-${moment().toString()}.xml`;
      } else if (isEqual(this.state.type, 'yaml')) {
        element.download = `${this.props.project.name}-export-${moment().toString()}.yaml`;
      } else if (isEqual(this.state.type, 'apple')) {
        element.download = `${this.props.project.name}-export-${moment().toString()}.txt`;
      }
      element.click();
    }
  }

  handleSubmit() {
    this.props.exportProject(this.props.token, this.props.project._id,
      this.state.locale, this.state.type);
  }

  clickList(event, type) {
    return this.setState(merge(set({}, `open${type}`, true), {
      anchorEl: event.currentTarget
    }));
  }

  toggleMenu(type) {
    return this.setState(set({}, `open${type}`, false));
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
            open={this.state.opentype}
            anchorEl={this.state.anchorEl}
            onRequestClose={this.toggleMenu.bind(this, 'type')}>
            {map(types, (type) =>
              <MenuItem
                onClick={event => this.handleChange(type, 'type')}
                key={type}>
                {type}
              </MenuItem>
            )}
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
            open={this.state.openlocale}
            anchorEl={this.state.anchorEl}
            onRequestClose={this.toggleMenu.bind(this, 'locale')}>
            {map(locales, (locale) =>
              <MenuItem
                onClick={event => this.handleChange(locale.code, 'locale')}
                key={locale.code}>
                {locale.code}
              </MenuItem>
            )}
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



