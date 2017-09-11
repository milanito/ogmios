import React, { Component } from 'react';
import Menu, { MenuItem } from 'material-ui/Menu';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Dropzone from 'react-dropzone';
import { CircularProgress  } from 'material-ui/Progress';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import {
  first, last, split, keys, isEmpty, map
} from 'lodash';

import { fetchProjectKeys } from '../actions/keys';
import { fetchProjectLocales } from '../actions/locales';
import { uploadKeys, uploadLocale, clearImports } from '../actions/upload';
import {
  jsonToFlatJSON, csvToJSON, xmlToJSON, yamlToJSON, appleToJSON
} from '../utils';

class UploadProject extends Component {
  constructor(props) {
    super(props);

    this.state = { json: {}, locale: '', openLocale: false, anchorEl: null, next: true };
  }

  componentWillMount() {
    this.props.clearImports();
  }

  componentWillReceiveProps(newProps) {
    const { uploading, uploaded, importing, imported } = newProps;
    if (uploaded && this.state.next) {
      this.setState({ next: false });
      this.props.uploadLocale(this.props.token, this.state.json,
        this.state.locale, this.props.project._id);
    } else if (imported) {
      this.props.fetchProjectKeys(this.props.token, this.props.project._id);
      this.props.fetchProjectLocales(this.props.token, this.props.project._id);
    }
  }

  onDrop() {
    return (acceptedFiles, rejectedFiles) => {
      const file = first(acceptedFiles);
      const type = last(split(file.name, '.'));

      const reader = new FileReader();
      reader.onload = () => {
        const fileString = reader.result.toString();
        switch (type) {
          case 'json':
            return this.setState({ json: jsonToFlatJSON(JSON.parse(fileString)) });
          case 'yaml':
          case 'yml':
            return this.setState({ json: jsonToFlatJSON(yamlToJSON(fileString)) });
          case 'csv':
            return this.setState({ json: jsonToFlatJSON(csvToJSON(fileString)) });
          case 'xml':
            return xmlToJSON(fileString)
            .then(json => this.setState({ json: jsonToFlatJSON(json) }));
          case 'txt':
            return this.setState({ json: jsonToFlatJSON(appleToJSON(fileString)) });
          default:
            return;
        }
      };

      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');

      reader.readAsBinaryString(file);
    };
  }

  clickList(event) {
    return this.setState({ openLocale: true, anchorEl: event.currentTarget });
  }

  toggleMenu() {
    return this.setState({ openLocale: false });
  }

  handleChange(locale) {
    this.setState({ openLocale: false, locale });
  }

  uploadData() {
    this.props.uploadKeys(this.props.token, keys(this.state.json), this.props.project._id);
  }

  render() {
    const { t, locales, uploading, uploaded, importing, imported } = this.props;
    const { json } = this.state;

    if (uploading && !uploaded && !importing && !imported) {
      return this.renderWorking('UPLOAD.uploading');
    } else if (!uploading && uploaded && !importing && !imported) {
      return this.renderWorking('UPLOAD.uploaded');
    } else if (importing) {
      return this.renderWorking('UPLOAD.importing');
    } else if (imported) {
      return this.renderEnd();
    } else if (!isEmpty(json)) {
      return this.renderJSON();
    }
    return (
      <Grid container align="center" justify="center" direction="column">
        <Grid item xs>
          <Dropzone onDrop={this.onDrop()} multiple={false}>
            {t('PROJECT.dropFile')}
          </Dropzone>
        </Grid>
      </Grid>
    )
  }

  renderValidateButton() {
    const { t } = this.props;
    return (
      <Button raised
        onClick={this.uploadData.bind(this)}>
        {t('PROJECT.validate')}
      </Button>
    )
  }

  renderEnd() {
    const { t } = this.props;
    return (
      <Grid container direction="column" align="center">
        <Grid item xs>
          <Typography type="subheading">
            {t('UPLOAD.finish')}
          </Typography>
        </Grid>
      </Grid>
    )
  }

  renderWorking(type) {
    const { t } = this.props;
    return (
      <Grid container direction="column" align="center">
        <Grid item xs>
          <Typography type="subheading">
            {t(type)}
          </Typography>
        </Grid>
        <Grid item xs>
          <CircularProgress />
        </Grid>
      </Grid>
    )
  }

  renderJSON() {
    const { t, locales } = this.props;
    const { json } = this.state;

    return (
      <Grid container direction="column" align="center">
        <Grid item xs>
          <Typography type="subheading">
            {t('UPLOAD.totalKeys')} {keys(json).length}
          </Typography>
        </Grid>
        <Grid item xs>
          <List>
            <ListItem button
              onClick={event => this.clickList(event)}>
              <ListItemText primary={t('UPLOAD.selectLocale')}
                secondary={this.state.locale}/>
            </ListItem>
          </List>
          <Menu
            open={this.state.openLocale}
            anchorEl={this.state.anchorEl}
            onRequestClose={this.toggleMenu.bind(this)}>
            {map(locales, (locale) =>
                <MenuItem
                  key={locale.code}
                  selected={locale.code === this.state.locale}
                  onClick={event => this.handleChange(locale.code)}>
                  {locale.code}
                </MenuItem>
            )}
          </Menu>
        </Grid>
        <Grid item xs>
          {!isEmpty(this.state.locale) ? this.renderValidateButton() : <div></div>}
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => ({
  project: state.project.item,
  locales: state.locales.list,
  uploading: state.upload.uploading,
  uploaded: state.upload.uploaded,
  importing: state.upload.importing,
  imported: state.upload.imported,
  token: state.auth.token
});

const mapDispatchToProps = {
  uploadKeys,
  uploadLocale,
  clearImports,
  fetchProjectKeys,
  fetchProjectLocales
};


export default connect(mapStateToProps, mapDispatchToProps)(translate()(UploadProject));
