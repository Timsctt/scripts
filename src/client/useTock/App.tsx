import React from 'react';
import TockContext from './TockContext';

import Chat from '../components/Chat';
import Launcher from '../components/Launcher';

type Props = {
  toggleFullScreen: boolean;
};

export default class App extends React.Component<Props, any>{

  constructor(props: Props) {
    super(props);

    this.state = {
      isHidden: true,
      behavior: {
        showChat: false,
        disabledInput: true
      }
    };

    this.toggleHidden = this.toggleHidden.bind(this);
  }

  toggleHidden() {
    this.setState({
      behavior: {
        showChat: !this.state.behavior.showChat
      }
    })
  }

  render() {
    return (
      <div className="appContainer">
        <TockContext>
          <Chat
            endPoint="http://7afdf60ce1d5.ngrok.io/io/app/truc_test/web"
            referralParameter='referralParameter'
            timeoutBetweenMessage={1.5}
            title="Chatbot MGEN"
            showChat={this.state.behavior.showChat}
          />
          <Launcher
            openLabel="conversation opened"
            closeLabel="conversation closed"
            showChat={this.toggleHidden}
            /*
            badge={props.badge}
            fullScreenMode={props.fullScreenMode}
            tooltipPayload={props.tooltipPayload}
            */
          />
        </TockContext>
      </div>
    )
  }
}
