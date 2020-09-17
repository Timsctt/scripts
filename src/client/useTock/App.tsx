import { ThemeProvider } from 'emotion-theming';
import React from 'react';
import Chat from '../components/Chat';
import TockContext from './TockContext';


function App() {
  return (
    <div>
    <h1>Hello</h1>
    <TockContext>
      <Chat
        endPoint="http://localhost:8080/io/app/truc_test/web"
        referralParameter='referralParameter'
        timeoutBetweenMessage={1.5}
      />
    </TockContext>
    </div>
  )
}

export default App;
