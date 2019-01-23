import { injectGlobal } from 'react-emotion';

injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,900');
  html, body, #root {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0; 
    font-family: 'Source Sans Pro', sans-serif;
    line-height: 1.8;
    background-color: #f7f3f0;
  }
  * {
  box-sizing: border-box;
}
*:before {
  box-sizing: border-box;
}
*:after {
  box-sizing: border-box;
}
  `;