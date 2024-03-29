import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import i18next from '../i18n';
import * as settingsActions from '../store/settings/actions';

// Connected to Redux Wrapper Component
class i18 extends React.Component {
  componentDidMount() {
    const { updateLanguageTexts, loadSettings } = this.props;
    i18next.on('languageChanged', updateLanguageTexts);
    loadSettings();
  }

  componentWillUnmount() {
    const { updateLanguageTexts } = this.props;
    i18next.off('languageChanged', updateLanguageTexts);
  }

  render() {
    const { children } = this.props;
    return children;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadSettings: () => dispatch(settingsActions.loadSettings()),
    updateLanguageTexts: () => dispatch(settingsActions.updateLanguageTexts())
  };
};

// Connect i18 to Redux
const I18Connected = connect(
  null,
  mapDispatchToProps
)(i18);

i18.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  loadSettings: PropTypes.func.isRequired,
  updateLanguageTexts: PropTypes.func.isRequired
};

// Hoc - Manipulate translation into the application
const i18Provider = WrappedComponent => {
  return class extends React.Component {
    render() {
      return (
        <I18Connected>
          <WrappedComponent {...this.props} />
        </I18Connected>
      );
    }
  };
};

export default i18Provider;
