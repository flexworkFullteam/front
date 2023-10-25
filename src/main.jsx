import React from 'react';
import ReactDOM from 'react-dom';
import { Auth0Provider } from "@auth0/auth0-react";
import { App } from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store.js';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
      domain = "https://dev-jbrduvmec788q7yw.us.auth0.com"
      clientId = "14GVJBR2Ib3kQ5TA8yggxoOdmy0Y8NeY"
      redirectUri={window.location.origin}
      audience = "https://dev-jbrduvmec788q7yw.us.auth0.com/api/v2/"
    >
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </Auth0Provider>
  </React.StrictMode>,
);


