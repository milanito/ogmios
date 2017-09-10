import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import { TextField } from 'material-ui';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { get, set, isEmpty, isUndefined } from 'lodash';

import { projectSave } from '../actions/project';

class ProjectMainName extends Component {
  constructor(props) {
    super(props);

    this.state = { name: '' };
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
  render() {
    const { t } = this.props;
    return (
      <Grid container direction="row">
        <Grid item xs>
          <TextField
            label={t('PROJECT.fieldName')}
            onChange={this.updateValue()}
            value={this.state.name}
            type="text" />
        </Grid>
        <Grid item xs>
          <Button raised
            onClick={this.updateName.bind(this)}>
            {t('PROJECT.validate')}
          </Button>
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


export default connect(mapStateToProps, mapDispatchToProps)(translate()(ProjectMainName));




