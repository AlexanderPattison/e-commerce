'use client';
import React from 'react';

const LoginPage: React.FC = () => {
    return (
        <div>
            <h1>Login</h1>
            <a href="/api/auth0/login">Click here to login</a>
        </div>
    );
};

export default LoginPage;
