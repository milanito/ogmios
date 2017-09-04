import React, { Component } from 'react';
import FileDownloadIcon from 'material-ui-icons/FileDownload';
import FileUploadIcon from 'material-ui-icons/FileUpload';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { IconButton, TextField, RaisedButton, Dialog } from 'material-ui';
import { get, set, isEmpty, isUndefined } from 'lodash';
import {
  Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle
} from 'material-ui/Toolbar';

import ProjectUsers from './ProjectUsers';
import DownloadProject from './DownloadProject';
import { projectSave } from '../actions/project';

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
        <Toolbar>
          <ToolbarGroup>
            <ToolbarTitle text={t('PROJECT.title')} />
            <ToolbarSeparator />
          </ToolbarGroup>
          <ToolbarGroup>
            <TextField
              floatingLabelText={t('PROJECT.fieldName')}
              onChange={this.updateValue()}
              value={this.state.name}
              type="text" />
            <RaisedButton
              onClick={this.updateName.bind(this)}
              label={t('PROJECT.validate')} />
          </ToolbarGroup>
          <ToolbarGroup>
            <IconButton onClick={this.handleFile.bind(this, 'isDownloading', true)}><FileDownloadIcon /></IconButton>
            <ToolbarSeparator />
            <IconButton onClick={this.handleFile.bind(this, 'isUploading', true)}><FileUploadIcon /></IconButton>
          </ToolbarGroup>
        </Toolbar>
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
        </Dialog>
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



