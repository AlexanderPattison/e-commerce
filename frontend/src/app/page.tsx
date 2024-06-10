'use client';
import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useUser } from '@auth0/nextjs-auth0/client';
import UserMenu from '../components/UserMenu';

// Dynamically import the LandingClient component
const LandingClient = dynamic(() => import('./landing/LandingClient'), { ssr: false });

const LandingPage: React.FC = () => {
    const { user, error, isLoading } = useUser();

    useEffect(() => {
        console.log('User:', user);
        console.log('Error:', error);
        console.log('IsLoading:', isLoading);
    }, [user, error, isLoading]);

    return (
        <div>
            <UserMenu user={user} />
            {isLoading && <div>Loading...</div>}
            {!isLoading && <LandingClient />}
        </div>
    );
};

export default LandingPage;
