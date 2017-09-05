import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import {
  get, set, isEmpty, isUndefined, map
} from 'lodash';
import {
  Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle
} from 'material-ui/Toolbar';
import {
  TextField, RaisedButton, List, Paper
} from 'material-ui';

import ProjectCard from '../components/ProjectCard';
import AddProjectClientForm from './AddProjectClientForm';
import {} from '../actions/client';
import { listStyle, elementStyle } from '../styles/lists';

class ClientMain extends Component {
  constructor(props) {
    super(props);

    this.state = { name: '' };
  }


  componentWillReceiveProps(newProps) {
    this.setState({ name: get(newProps, 'client.name', '') });
  }

  updateName() {
    if (!isEmpty(this.state.name) && !isUndefined(this.props.client)) {
      //this.props.clientSave(this.props.client.id, this.state.name);
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
    const { t, client } = this.props;
    return (
      <div>
        <Toolbar>
          <ToolbarGroup>
            <ToolbarTitle text={t('CLIENT.title')} />
            <ToolbarSeparator />
          </ToolbarGroup>
          <ToolbarGroup>
            <TextField
              floatingLabelText={t('CLIENT.fieldName')}
              onChange={this.updateValue()}
              value={this.state.name}
              type="text" />
            <RaisedButton
              onClick={this.updateName.bind(this)}
              label={t('CLIENT.validate')} />
          </ToolbarGroup>
        </Toolbar>
        <List style={listStyle}>
          {map(client.projects, (project) =>(
          <Paper style={elementStyle} key={project._id}>
            <ProjectCard project={project} />
          </Paper>
          ))}
        </List>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  client: state.client.item,
});

const mapDispatchToProps = {
};


export default connect(mapStateToProps, mapDispatchToProps)(translate()(ClientMain));




