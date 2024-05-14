// pages/_app.tsx
import React from 'react';
import { AppProps } from 'next/app';
import { Auth0Provider } from '@auth0/auth0-react';
import { Refine } from '@refinedev/core';
import authProvider from '../src/providers/authProvider';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Auth0Provider
      domain="dev-xm5uyt11wa8my2yg.us.auth0.com"
      clientId="VxkC5MaIgsC2FiRApgTHeuk3CKVTzCJA"
      redirectUri={typeof window !== 'undefined' && window.location.origin}
    >
      <Refine authProvider={authProvider}>
        <Component {...pageProps} />
      </Refine>
    </Auth0Provider>
  );
};

export default MyApp;
