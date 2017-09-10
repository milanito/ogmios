import React, { Component } from 'react';
import Dialog, { DialogContent, DialogTitle } from 'material-ui/Dialog';
import AppBar from 'material-ui/AppBar';
import Typography from 'material-ui/Typography';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import FileDownloadIcon from 'material-ui-icons/FileDownload';
import FileUploadIcon from 'material-ui-icons/FileUpload';
import { TextField } from 'material-ui';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { get, set, isEmpty, isUndefined } from 'lodash';

import ProjectUsers from './ProjectUsers';
import DownloadProject from './DownloadProject';
import UploadProject from './UploadProject';
import { projectSave } from '../actions/project';
import {
  projectsToolbarTitleStyle, projectsCreateStyle
} from '../styles/projects';

class ProjectMain extends Component {
  constructor(props) {
    super(props);

    this.state = { name: '', isDownloading: false, isUploading: false };
  }


  componentWillReceiveProps(newProps) {
    this.setState({ name: get(newProps, 'project.name', '') });
  }

  updateName() {
    if (!isEmpty(this.state.name) && !isUndefined(this.props.project)) {
      this.props.projectSave(this.props.project._id, this.state.name);
    }
  }

  updateValue() {
    return (event, value) => {
      this.setState(set({}, 'name', value));
    };
  }

  handleFile(type, open) {
    this.setState(set({}, type, open));
  }

  render() {
    const { t } = this.props;
    const { isDownloading, isUploading } = this.state;
    const actions = [];
    return (
      <div>
        <AppBar position="static">
          <Toolbar disableGutters>
            <Typography type="title" color="inherit" style={projectsToolbarTitleStyle}>
              {t('PROJECT.title')}
            </Typography>
            <IconButton onClick={this.handleFile.bind(this, 'isDownloading', true)}><FileDownloadIcon /></IconButton>
            <IconButton onClick={this.handleFile.bind(this, 'isUploading', true)}><FileUploadIcon /></IconButton>
          </Toolbar>
        </AppBar>
        <Dialog
          title={t('PROJECT.downloadFile')}
          actions={actions}
          modal={false}
          open={isDownloading}
          onRequestClose={this.handleFile.bind(this, 'isDownloading', false)}>
          <DownloadProject />
        </Dialog>
        <Dialog
          title={t('PROJECT.updloadFile')}
          actions={actions}
          modal={false}
          open={isUploading}
          onRequestClose={this.handleFile.bind(this, 'isUploading', false)}>
          <UploadProject />
        </Dialog>
        <div>
          <TextField
            label={t('PROJECT.fieldName')}
            onChange={this.updateValue()}
            value={this.state.name}
            type="text" />
          <Button raised
            onClick={this.updateName.bind(this)}>
            {t('PROJECT.validate')}
          </Button>
        </div>
        <ProjectUsers />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  project: state.project.item,
});

const mapDispatchToProps = {
  projectSave
};


export default connect(mapStateToProps, mapDispatchToProps)(translate()(ProjectMain));



