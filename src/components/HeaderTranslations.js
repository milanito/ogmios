import React, { Component } from 'react';
import Menu, { MenuItem } from 'material-ui/Menu';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import ClearIcon from 'material-ui-icons/Clear';
import VisibilityIcon from 'material-ui-icons/Visibility';
import VisibilityOffIcon from 'material-ui-icons/VisibilityOff';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { map, isEmpty, filter, isEqual } from 'lodash';

import CreateProjectLocaleForm from './CreateProjectLocaleForm';
import LocaleItem from './LocaleItem';

class HeaderTranslations extends Component {
  constructor(props) {
    super(props);

    this.state = {
      localeOne: '', localeTwo: '', visible: true, openOne: false,
      openTwo: false, anchorEl: null
    };
  }

  clickList(event, first) {
    if (first) {
      return this.setState({ openOne: true, anchorEl: event.currentTarget });
    }
    return this.setState({ openTwo: true, anchorEl: event.currentTarget });
  }

  toggleMenu(first) {
    if (first) {
      return this.setState({ openOne: false });
    }
    return this.setState({ openTwo: false });
  }

  handleChange(locale, first) {
    if (first) {
      return this.setState({ localeOne: locale, openOne: false });
    }
    return this.setState({ localeTwo: locale, openTwo: false });
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

  render() {
    const { locales, t } = this.props;
    return (
      <Grid container direction="row">
        <Grid item xs>
          <Typography type="headline">
            {t('PROJECT.localesChoice')}
          </Typography>
        </Grid>
        <Grid item xs>
          {!isEmpty(this.state.localeOne) || !isEmpty(this.state.localeTwo) ? this.renderVisibleIcon() : <div></div>}
        </Grid>
        <Grid item xs>
          {!isEmpty(this.state.localeOne) || !isEmpty(this.state.localeTwo) ? this.renderClearIcon() : <div></div>}
        </Grid>
        <Grid item xs>
          <List>
            <ListItem button
              onClick={event => this.clickList(event, true)}>
              <ListItemText primary={t('PROJECT.firstLocaleSelection')}
                secondary={this.state.localeOne}/>
            </ListItem>
          </List>
          <Menu
            open={this.state.openOne}
            anchorEl={this.state.anchorEl}
            onRequestClose={this.toggleMenu.bind(this, true)}>
            {map(locales, (locale, i) =>
              <MenuItem
                key={locale.code}
                selected={locale.code === this.state.localeOne}
                onClick={event => this.handleChange(locale.code, true)}>
                {locale.code}
              </MenuItem>
            )}
          </Menu>
        </Grid>
        <Grid item xs>
          <List>
            <ListItem button
              onClick={event => this.clickList(event, false)}>
              <ListItemText primary={t('PROJECT.secondLocaleSelection')}
                secondary={this.state.localeTwo}/>
            </ListItem>
          </List>
          <Menu
            open={this.state.openTwo}
            anchorEl={this.state.anchorEl}
            onRequestClose={this.toggleMenu.bind(this, false)}>
            {map(filter(locales, locale =>
              !isEqual(locale.code, this.state.localeOne)),
              (locale, i) =>
                <MenuItem
                  key={locale.code}
                  selected={locale.code === this.state.localeTwo}
                  onClick={event => this.handleChange(locale.code, false)}>
                  {locale.code}
                </MenuItem>
            )}
          </Menu>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  project: state.project.item,
  locales: state.locales.list
});

const mapDispatchToProps = {
};


export default connect(mapStateToProps, mapDispatchToProps)(translate()(HeaderTranslations));



