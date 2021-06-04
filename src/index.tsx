import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import GlobalStyles from "./Styles/globalStyle.js"
import App from './App';
import reportWebVitals from './reportWebVitals';
import ThemeLight from "./Styles/Theme"
import { ThemeProvider } from 'styled-components';
import 'antd/dist/antd.css';
import { store } from './Redux/redux';



ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={ThemeLight}>
      <React.StrictMode>
        <GlobalStyles />
        <App />
      </React.StrictMode>
    </ThemeProvider>
  </Provider>

  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
