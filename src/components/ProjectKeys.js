import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { List } from 'material-ui';
import { map } from 'lodash';

import CreateProjectKeyForm from './CreateProjectKeyForm';
import KeyItem from './KeyItem';

class ProjectKeys extends Component {
  render() {
    const { keys } = this.props;
    return (
      <div>
        <CreateProjectKeyForm />
        <h3>Total: {keys.length}</h3>
        <List>
          {map(keys, (key, i) => <KeyItem key={i} item={key} />)}
        </List>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  project: state.project.item,
  keys: state.keys.list
});

const mapDispatchToProps = {
};


export default connect(mapStateToProps, mapDispatchToProps)(translate()(ProjectKeys));


