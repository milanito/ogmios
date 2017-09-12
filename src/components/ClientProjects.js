import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';
import Grid from 'material-ui/Grid';
import List from 'material-ui/List';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import {
  get, set, isEmpty, isUndefined, map
} from 'lodash';

import ProjectCard from '../components/ProjectCard';
import AddProjectClientForm from './AddProjectClientForm';
import {} from '../actions/client';
import { listStyle, elementStyle } from '../styles/lists';

class ClientProjects extends Component {
  render() {
    const { t, client } = this.props;
    return (
      <Paper>
        <Grid container direction="column">
          <Grid item xs>
            <Grid container direction ="row">
              <Grid item xs>
                <Typography type="title">
                  {t('CLIENT.projectsList')}
                </Typography>
              </Grid>
              <Grid item xs>
                <AddProjectClientForm />
              </Grid>
            </Grid>
            <Divider />
          </Grid>
          <Grid item xs>
            <List style={listStyle}>
              {map(client.projects, (project) =>(
              <Paper style={elementStyle} key={project._id}>
                <ProjectCard project={project} client={client}/>
              </Paper>
              ))}
            </List>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

const mapStateToProps = (state) => ({
  client: state.client.item,
});

const mapDispatchToProps = {
};


export default connect(mapStateToProps, mapDispatchToProps)(translate()(ClientProjects));





