// src/pages/_app.tsx
import { AppProps } from 'next/app';
import { Refine, AuthBindings } from '@refinedev/core';
import { Auth0Provider } from '@auth0/auth0-react';
import { RefineKbarProvider } from '@refinedev/kbar';
import authProvider from 'src/providers/authProvider';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Auth0Provider
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN}
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}
      redirectUri={typeof window !== 'undefined' && window.location.origin}
    >
      <RefineKbarProvider>
        <Refine authProvider={authProvider}>
          <Component {...pageProps} />
        </Refine>
      </RefineKbarProvider>
    </Auth0Provider>
  );
};

export default MyApp;
