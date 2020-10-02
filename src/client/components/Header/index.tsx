import React from 'react';
const fullscreenExit = require("../../assets/images/fullscreen_button.svg") as string;
const fullscreen = require("../../assets/images/fullscreen_exit_button.svg") as string;
const closeChat = require("../../assets/images/clear-button.svg") as string;

type Props = {
  title: String;
  fullScreen: boolean;
  toggleFullScreen: () => void;
  toggleChat: () => void;
};

export default class Header extends React.Component<Props> {
  constructor(props) {
    super(props)

  }

  render() {
    return (
      <div className="header-chat">
        {this.props.title}
        <span  className="toggle-fullscreen-button">
          <button onClick={this.props.toggleFullScreen}>
              <img
                className={`toggle-fullscreen`}
                src={this.props.fullScreen ? fullscreen : fullscreenExit}
                alt="toggle fullscreen"
              />
            </button>
            {this.props.fullScreen ? <button onClick={this.props.toggleChat}>
              <img
                className={`toggle-fullscreen`}
                src={this.props.fullScreen ? closeChat : undefined}
                alt="toggle fullscreen"
              />
            </button> : undefined }
          </span>
      </div>
    )
  }
}