import React, {
  FocusEvent,
} from 'react';
const openChat = require("../../assets/images/launcher_button.svg") as string;
const closeChat = require("../../assets/images/clear-button.svg") as string;


interface Props {
  launcherLabel: boolean;
  fullScreen: boolean;
  showChat: () => void;
}


export default class Launcher extends React.Component<Props>  {

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <button
        type="button"
        className={`
          mgen-launcher 
          ${this.props.launcherLabel? "mgen-launcher-open" : "mgen-launcher-close"}
          ${this.props.fullScreen? "mgen-launcher-come" : "mgen-launcher-gone"}
        `}
        onClick={this.props.showChat}
      >
        {
          <img
            src={this.props.launcherLabel ? closeChat : openChat}
            className="mgen-close-launcher"
            alt={this.props.launcherLabel ? "Conversation opened" : "Conversation closed"}
          />
        }
      </button>
    );
  }
}

