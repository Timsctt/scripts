import React from 'react';
import TockContext from './TockContext';

import Chat from '../components/Chat';
import Launcher from '../components/Launcher';

type Props = {
  fullScreen: boolean;
};

export default class App extends React.Component<Props, any>{

  constructor(props: Props) {
    super(props);

    this.state = {
      isHidden: true,
      behavior: {
        showChat: false,
        disabledInput: true,
      },
      fullScreen: false,
    };

    this.toggleHidden = this.toggleHidden.bind(this);
    this.toggleFullScreen = this.toggleFullScreen.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', () => {
        this.setState({
          fullScreen: window.innerWidth < 800
        });
    }, true);
  }

  toggleHidden() {
    this.setState({
      behavior: {
        showChat: !this.state.behavior.showChat
      }
    })
  }

  toggleFullScreen() {
    this.setState({
      fullScreen: !this.state.fullScreen
    }), (
      console.log(this.state.fullScreen)
    )
  }

  render() {
    return (
      <div className={`app-container mgen-chat-module ${this.state.fullScreen? "mgen-chat-fullscreen" : "app-container-reduce"}`}>
        <TockContext>
          <Chat
            endPoint="http://7afdf60ce1d5.ngrok.io/io/app/truc_test/web"
            referralParameter='referralParameter'
            timeoutBetweenMessage={1.5}
            title="Chatbot MGEN"
            showChat={this.state.behavior.showChat}
            fullScreen={this.state.fullScreen}
            toggleFullScreen={this.toggleFullScreen}
            toggleChat={this.toggleHidden}
          />
          {!this.state.behavior.showChat && !this.state.fullScreen && <Launcher
            launcherLabel={this.state.behavior.showChat}
            showChat={this.toggleHidden}
            fullScreen={this.state.fullScreen}
            /*
            badge={props.badge}
            fullScreenMode={props.fullScreenMode}
            tooltipPayload={props.tooltipPayload}
            */
          />}
        </TockContext>
      </div>
    )
  }
}
