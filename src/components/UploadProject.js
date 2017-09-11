import React, { Component } from 'react';
import Dropzone from 'react-dropzone'
import { connect } from 'react-redux';
import { translate } from 'react-i18next';

class UploadProject extends Component {
  onDrop() {
    return (acceptedFiles, rejectedFiles) => {
    };
  }

  render() {
    const { t } = this.props;
    return (
      <Dropzone onDrop={this.onDrop.bind(this)}>
        {t('PROJECT.dropFile')}
      </Dropzone>
    )
  }
}

const mapStateToProps = (state) => ({
  project: state.project.item,
});

const mapDispatchToProps = {
};


export default connect(mapStateToProps, mapDispatchToProps)(translate()(UploadProject));
