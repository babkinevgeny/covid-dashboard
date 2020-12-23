import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Fullscreen from '@material-ui/icons/Fullscreen';
import FullscreenExit from '@material-ui/icons/FullscreenExit';
import PropTypes from 'prop-types';
import './index.scss';

class FullPageComponentWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullScreen: false,
    };
  }

  onExpandButtonClick = () => {
    const { fullScreen } = this.state;
    document.body.style.overflow = fullScreen ? 'unset' : 'hidden';

    this.setState((state) => ({
      fullScreen: !state.fullScreen,
    }));
  }

  render() {
    const { children } = this.props;
    const { fullScreen } = this.state;
    const icon = fullScreen ? <FullscreenExit /> : <Fullscreen />;
    return (
      <div className={`component_wrapper${fullScreen ? ' wrapper_fullscreen' : ''}`}>
        <IconButton
          className="page_expand"
          onClick={this.onExpandButtonClick}
          id="fullScreen"
        >
          {icon}
        </IconButton>
        {children}
      </div>
    );
  }
}

FullPageComponentWrapper.propTypes = {
  children: PropTypes.element.isRequired,
};

export default FullPageComponentWrapper;
