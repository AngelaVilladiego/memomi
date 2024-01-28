// src/auth/auth0-provider-with-history.js

import React from 'react';
import { useHistory, useNavigate } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';

const Auth0ProviderWithHistory = ({ children }) => {
  const domain = "dev-cz8wroj02ik53vzv.us.auth0.com";
  const clientId = "2JtJXSwm3Z1xmi5JUua0tZpY7MBmFzU6";

  const navigate = useNavigate();

  const onRedirectCallback = (appState) => {
    navigate(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={"https://localhost:3000/focus"}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;