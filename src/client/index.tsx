import React from "react";
import ReactDOM from "react-dom";
import App from './useTock/App';

console.log('yeees')

ReactDOM.render(
  <React.StrictMode>
    <App 
    toggleFullScreen={true}/>
  </React.StrictMode>,
  document.getElementById('appchat')
);

