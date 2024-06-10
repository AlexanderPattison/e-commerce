'use client';

import React from 'react';
import { Provider } from 'react-redux';
import store from '../store';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../theme';
import '../app/globals.css';
import { UserProvider } from '@auth0/nextjs-auth0/client';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <Provider store={store}>
                    <ThemeProvider theme={theme}>
                        <CssBaseline />
                        <UserProvider>
                            {children}
                        </UserProvider>
                    </ThemeProvider>
                </Provider>
            </body>
        </html>
    );
}
