import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the LandingClient component
const LandingClient = dynamic(() => import('./landing/LandingClient'), { ssr: false });

const LandingPage: React.FC = () => {
    return (
        <div>
            <LandingClient />
        </div>
    );
};

export default LandingPage;
