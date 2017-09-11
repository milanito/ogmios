import React, { Component } from 'react';
import Dialog, { DialogTitle } from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import FileDownloadIcon from 'material-ui-icons/FileDownload';
import FileUploadIcon from 'material-ui-icons/FileUpload';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { get, set, isEmpty, isUndefined } from 'lodash';

import DownloadProject from './DownloadProject';
import UploadProject from './UploadProject';

class ProjectMainActions extends Component {
  constructor(props) {
    super(props);

    this.state = { isDownloading: false, isUploading: false };
  }

  handleFile(type, open) {
    this.setState(set({}, type, open));
  }

  render() {
    const { t } = this.props;
    const { isDownloading, isUploading } = this.state;
    return (
      <div>
        <Dialog
          open={isDownloading}
          onRequestClose={this.handleFile.bind(this, 'isDownloading', false)}>
          <DialogTitle>{t('PROJECT.downloadFile')}</DialogTitle>
          <DownloadProject />
        </Dialog>
        <Dialog
          open={isUploading}
          onRequestClose={this.handleFile.bind(this, 'isUploading', false)}>
          <DialogTitle>{t('PROJECT.uploadFile')}</DialogTitle>
          <UploadProject />
        </Dialog>
        <Grid container direction="row">
          <Grid item xs>
            <Button raised onClick={this.handleFile.bind(this, 'isDownloading', true)}>
              <FileDownloadIcon />
              <Typography type="body2">
                {t('PROJECT.download')}
              </Typography>
            </Button>
          </Grid>
          <Grid item xs>
            <Button raised onClick={this.handleFile.bind(this, 'isUploading', true)}>
              <FileUploadIcon />
              <Typography type="body2">
                {t('PROJECT.upload')}
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  project: state.project.item,
});

const mapDispatchToProps = {
};


export default connect(mapStateToProps, mapDispatchToProps)(translate()(ProjectMainActions));




