import React from 'react';
import ReactDOM from 'react-dom';
import { Auth0Provider } from "@auth0/auth0-react";
import { App } from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store.js';
import { getEnvVariables } from './helpers/getEnvVariables.js';

const {VITE_CLIENT_AUTH0, VITE_DOMAIN_AUTH0, VITE_AUDIENCE_AUTH0} = getEnvVariables();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
      domain={VITE_DOMAIN_AUTH0}
      clientId={VITE_CLIENT_AUTH0}
      redirectUri={window.location.origin}
      audience ={VITE_AUDIENCE_AUTH0}
    >
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </Auth0Provider>
  </React.StrictMode>,
);


