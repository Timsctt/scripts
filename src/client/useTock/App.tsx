import React, { ReactNode } from 'react';
import TockContext, { TockState } from './TockContext';

import Chat from '../components/Chat';
import Launcher from '../components/Launcher';

type Props = {
  
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

  componentDidMount():void {
    window.addEventListener('resize', () => {
        this.setState({
          fullScreen: window.innerWidth < 800
        }, () => console.log(this.state.fullScreen));
    }, true);
  }

  toggleHidden():void {
    this.setState({
      behavior: {
        showChat: !this.state.behavior.showChat
      },
      isOpen: !this.state.isOpen
    })
  }

  toggleFullScreen():void {
    this.setState({
      fullScreen: !this.state.fullScreen
    })
  }

  isAuthenticated(): boolean {
    return false
  }

  render() {
    return (
      <div className={`app-container mgen-chat-module ${this.state.fullScreen? "mgen-chat-fullscreen" : "app-container-reduce"}`}>
        <TockContext>
          <Chat
            endPoint="http://06707e408a25.ngrok.io/io/app/truc_test/web"
            referralParameter='referralParameter'
            timeoutBetweenMessage={0}
            title="Chatbot MGEN"
            showChat={this.state.behavior.showChat}
            fullScreen={this.state.fullScreen}
            toggleFullScreen={this.toggleFullScreen}
            toggleChat={this.toggleHidden}
            isAuthenticated={this.isAuthenticated()}
          /> 
          <Launcher
            launcherLabel={this.state.behavior.showChat}
            showChat={this.toggleHidden}
            fullScreen={this.state.fullScreen}
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
