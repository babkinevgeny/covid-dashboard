import React from 'react';
import PropTypes from 'prop-types';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import { keyboardScheme } from '../../helpers';

const KeyboardContainer = ({ isHidden, updateCasesTableInputValue }) => {
  const classes = ['keyboard-container'];

  if (isHidden) {
    classes.push('keyboard-container--hidden');
  }

  return (
    <section className={classes.join(' ')}>
      <Keyboard
        preventMouseDownDefault
        onKeyPress={(value) => updateCasesTableInputValue(value)}
        theme="hg-theme-default hg-layout-default"
        layout={{
          default: keyboardScheme,
        }}
      />
    </section>
  );
};

KeyboardContainer.propTypes = {
  isHidden: PropTypes.bool,
  updateCasesTableInputValue: PropTypes.func.isRequired,
};

KeyboardContainer.defaultProps = {
  isHidden: false,
};

export default KeyboardContainer;
