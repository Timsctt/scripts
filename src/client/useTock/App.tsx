import { ThemeProvider } from 'emotion-theming';
import React from 'react';
import Chat from '../components/Chat';
import TockContext from './TockContext';


function App() {
  return (
    <div>
    <TockContext>
      <Chat
        endPoint="http://a32b23d32f52.ngrok.io/io/app/truc_test/web"
        referralParameter='referralParameter'
        timeoutBetweenMessage={1.5}
      />
    </TockContext>
    </div>
  )
}

export default App;
