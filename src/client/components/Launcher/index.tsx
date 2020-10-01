import React, {
  FocusEvent,
} from 'react';
import { render } from 'react-dom';

interface Props {
  openLabel: string;
  closeLabel: string;
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
        className={'mgen-launcher'}
        onClick={this.props.showChat}
      >
        {
          <img
            src={'../src/components/Launcher/assets/launcher_button.svg'}
            className="mgen-close-launcher"
            alt={this.props.openLabel}
          />
        }
      </button>
    );
  }
}

