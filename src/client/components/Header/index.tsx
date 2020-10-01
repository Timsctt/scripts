import React from 'react';
const fullscreenExit = require("../../assets/images/fullscreen_button.svg") as string;

type Props = {
  title: String;
  fullScreen: boolean;
};

export default class Header extends React.Component<Props> {
  constructor(props) {
    super(props)

  }

  render() {
    return (
      <div className="header-chat">
        {this.props.title}
        <button className="toggle-fullscreen-button" onClick={() => console.log("toggleFullScreen")}>
            <img
              className={`toggle-fullscreen ${this.props.fullScreen ? 'fullScreenExitImage' : 'fullScreenImage'}`}
              src={this.props.fullScreen ? fullscreenExit : fullscreenExit}
              alt="toggle fullscreen"
            />
          </button>
      </div>
    )
  }
}