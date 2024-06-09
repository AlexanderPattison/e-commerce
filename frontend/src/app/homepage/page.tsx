import React from 'react';
import dynamic from 'next/dynamic';
import { Typography } from '@mui/material';

// Dynamically import the AppBarClient component
const AppBarClient = dynamic(() => import('./AppBarClient'), { ssr: false });

const Homepage: React.FC = () => {
    return (
        <div>
            <AppBarClient />
            <main>
                <Typography variant="h4" component="h1" gutterBottom>
                    Welcome to the Homepage
                </Typography>
                {/* Add more content here */}
            </main>
        </div>
    );
};

export default Homepage;
