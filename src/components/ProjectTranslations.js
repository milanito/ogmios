import React, { Component } from 'react';
import Menu, { MenuItem } from 'material-ui/Menu';
import ClearIcon from 'material-ui-icons/Clear';
import VisibilityIcon from 'material-ui-icons/Visibility';
import VisibilityOffIcon from 'material-ui-icons/VisibilityOff';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { IconButton } from 'material-ui';
import { map, filter, isEqual, isEmpty } from 'lodash';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

import TranslationsList from './TranslationsList';

class ProjectLocales extends Component {
  constructor(props) {
    super(props);

    this.state = { localeOne: '', localeTwo: '', visible: true };
  }

  handleChangeOne(event, index, localeOne) {
    this.setState({ localeOne });
  }

  handleChangeTwo(event, index, localeTwo) {
    this.setState({ localeTwo });
  }

  switchVisibility(visible) {
    this.setState({ visible });
  }

  clearLocales() {
    this.setState({
      localeOne: '',
      localeTwo: ''
    });
  }

  renderVisibleIcon() {
    if (this.state.visible) {
      return (
        <IconButton onClick={this.switchVisibility.bind(this, false)}>
          <VisibilityIcon />
        </IconButton>
      );
    }
    return (
      <IconButton onClick={this.switchVisibility.bind(this, true)}>
        <VisibilityOffIcon />
      </IconButton>
    );
  }

  renderClearIcon() {
    return (
      <IconButton onClick={this.clearLocales.bind(this)}>
        <ClearIcon />
      </IconButton>
    )
  }

  renderToolBar() {
    const { locales, t } = this.props;
    return (
      <div>
        <Toolbar>
          <ToolbarGroup>
            <ToolbarTitle text={t('PROJECT.localesChoice')} />
            <ToolbarSeparator />
          </ToolbarGroup>
          <ToolbarGroup>
            {!isEmpty(this.state.localeOne) || !isEmpty(this.state.localeTwo) ? this.renderVisibleIcon() : <div></div>}
            <ToolbarSeparator />
            {!isEmpty(this.state.localeOne) || !isEmpty(this.state.localeTwo) ? this.renderClearIcon() : <div></div>}
            <ToolbarSeparator />
          </ToolbarGroup>
          <ToolbarGroup>
            <Menu
              onChange={this.handleChangeOne.bind(this)}>
              {map(locales, (locale, i) =>
                <MenuItem key={i} value={locale.code} primaryText={locale.code} onClick={this.handleChangeOne.bind(this)} />)}
            </Menu>
            <ToolbarSeparator />
            <Menu
              >
              {map(filter(locales, locale =>
                !isEqual(locale.code, this.state.localeOne)),
                (locale, i) =>
                <MenuItem key={i} value={locale.code} primaryText={locale.code} onChange={this.handleChangeTwo.bind(this)} />)}
            </Menu>
          </ToolbarGroup>
        </Toolbar>
      </div>
    );
  }

  renderTranslationsList() {
    if (!isEmpty(this.state.localeOne)) {
      return (
        <TranslationsList localeOne={this.state.localeOne}
          localeTwo={this.state.localeTwo} visible={this.state.visible} />
      );
    }
    return (<div></div>);
  }

  render() {
    return (
      <div>
        {this.renderToolBar()}
        {this.renderTranslationsList()}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  project: state.project.item,
  locales: state.locales.list,
});

const mapDispatchToProps = {
};


export default connect(mapStateToProps, mapDispatchToProps)(translate()(ProjectLocales));


