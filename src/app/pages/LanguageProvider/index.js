import { Children } from 'reacet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { IntlProvider } from 'react-intl';

import { makeSelectLocale } from './selectors';

export function LanguageProvider(props) {
  return (
    <IntlProvider
      locale={props.locale}
      key={props.locale}
      messages={props.messages[props.locale]}
    >
      {Children.only(props.children)}
    </IntlProvider>
  );
}

LanguageProvider.propTypes = {
  locale: PropTypes.string,
  messages: PropTypes.object,
  children: PropTypes.element.isRequired,
};

const mapStateToProps = createSelector(makeSelectLocale(), locale => ({
  locale,
}));

export default connect(mapStateToProps)(LanguageProvider);
