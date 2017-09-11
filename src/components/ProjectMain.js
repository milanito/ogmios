import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import FileDownloadIcon from 'material-ui-icons/FileDownload';
import FileUploadIcon from 'material-ui-icons/FileUpload';
import { TextField } from 'material-ui';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { get, set, isEmpty, isUndefined } from 'lodash';

import ProjectUsers from './ProjectUsers';
import ProjectMainActions from './ProjectMainActions';
import ProjectMainName from './ProjectMainName';
import DownloadProject from './DownloadProject';
import UploadProject from './UploadProject';
import { projectSave } from '../actions/project';
import { projectMainLeftBlock } from '../styles/project';

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
    return (
      <Grid container direction="row">
        <Grid item xs style={projectMainLeftBlock}>
          <Grid container direction="column">
            <Grid item xs>
              <ProjectMainName />
            </Grid>
            <Divider />
            <Grid item xs>
              <ProjectMainActions />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs>
          <ProjectUsers />
        </Grid>
      </Grid>
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



