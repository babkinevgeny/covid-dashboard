import React from 'react';
import PropTypes from 'prop-types';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';

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
          default: [
            '` 1 2 3 4 5 6 7 8 9 0 - = {bksp}',
            'q w e r t y u i o p [ ] \\',
            "a s d f g h j k l ; '",
            'z x c v b n m , . /',
            '{space}',
          ],
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
