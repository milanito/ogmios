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
import { updateLocale, clearLocales, updateVisible } from '../actions/translations';

class HeaderTranslations extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openOne: false, openTwo: false, anchorEl: null
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
      this.setState({ openOne: false });
      return this.props.updateLocale(locale, true);
    }
    this.setState({ openTwo: false });
    return this.props.updateLocale(locale, false);
  }

  switchVisibility(visible) {
    this.props.updateVisible(visible);
  }

  renderVisibleIcon() {
    if (this.props.visible) {
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
      <IconButton onClick={this.props.clearLocales.bind(this)}>
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
          {!isEmpty(this.props.localeOne) || !isEmpty(this.props.localeTwo) ? this.renderVisibleIcon() : <div></div>}
        </Grid>
        <Grid item xs>
          {!isEmpty(this.props.localeOne) || !isEmpty(this.props.localeTwo) ? this.renderClearIcon() : <div></div>}
        </Grid>
        <Grid item xs>
          <List>
            <ListItem button
              onClick={event => this.clickList(event, true)}>
              <ListItemText primary={t('PROJECT.firstLocaleSelection')}
                secondary={this.props.localeOne}/>
            </ListItem>
          </List>
          <Menu
            open={this.state.openOne}
            anchorEl={this.state.anchorEl}
            onRequestClose={this.toggleMenu.bind(this, true)}>
            {map(locales, (locale, i) =>
              <MenuItem
                key={locale.code}
                selected={locale.code === this.props.localeOne}
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
                secondary={this.props.localeTwo}/>
            </ListItem>
          </List>
          <Menu
            open={this.state.openTwo}
            anchorEl={this.state.anchorEl}
            onRequestClose={this.toggleMenu.bind(this, false)}>
            {map(filter(locales, locale =>
              !isEqual(locale.code, this.props.localeOne)),
              (locale, i) =>
                <MenuItem
                  key={locale.code}
                  selected={locale.code === this.props.localeTwo}
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
  locales: state.locales.list,
  visible: state.translations.visible,
  localeOne: state.translations.localeOne,
  localeTwo: state.translations.localeTwo
});

const mapDispatchToProps = {
  updateVisible,
  updateLocale,
  clearLocales
};


export default connect(mapStateToProps, mapDispatchToProps)(translate()(HeaderTranslations));
