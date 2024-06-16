import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const AuthenticationButton = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return isAuthenticated ? (
    <button onClick={() => logout({ returnTo: window.location.origin })}>
      Logout
    </button>
  ) : (
    <button onClick={() => loginWithRedirect()}>Login</button>
  );
};

export default AuthenticationButton;
