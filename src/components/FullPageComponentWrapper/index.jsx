import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
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
    this.setState((state) => ({
      fullScreen: !state.fullScreen,
    }));
  }

  render() {
    const { children } = this.props;
    const { fullScreen } = this.state;
    const icon = fullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />;
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
