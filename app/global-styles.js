import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }
  
  a {
    color: rgb(0, 159, 217)
  }
  
  body ::-webkit-scrollbar {
    width: 10px;
  }
  
  body ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 1px grey; 
    background: white;
    border-top: 0;
    border-bottom: 0;
  }
  
  body ::-webkit-scrollbar-thumb {
    background-color: #bbbbbb;
    border: 3px solid transparent;
    border-radius: 9px;
    background-clip: content-box;
  }
`;
