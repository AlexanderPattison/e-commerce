import React from 'react';
import dynamic from 'next/dynamic';
import { Container, Box, Typography } from '@mui/material';
import { getStoreItems } from '../../lib/getStoreItems';

// Dynamically import the AppBarClient component
const AppBarClient = dynamic(() => import('./AppBarClient'), { ssr: false });
const StoreItem = dynamic(() => import('../../components/StoreItem'), { ssr: false });

const Homepage: React.FC = async () => {
    const items = await getStoreItems();

    return (
        <div>
            <AppBarClient />
            <main>
                <Typography variant="h4" component="h1" gutterBottom>
                    Welcome to the Homepage
                </Typography>
                <Container>
                    <Box sx={{ overflowX: 'auto', display: 'flex', gap: 2, height: '500px', alignItems: 'center' }}>
                        {items.map((item) => (
                            <Box key={item.id} sx={{ minWidth: 300 }}>
                                <StoreItem item={item} />
                            </Box>
                        ))}
                    </Box>
                </Container>
            </main>
        </div>
    );
};

export default Homepage;