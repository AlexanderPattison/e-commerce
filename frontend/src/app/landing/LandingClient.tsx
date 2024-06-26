'use client';

import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { useRouter } from 'next/navigation';

const LandingClient: React.FC = () => {
    const router = useRouter();

    const handleShopNow = () => {
        router.push('/homepage');
    };

    return (
        <Container maxWidth="lg">
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                minHeight="100vh"
                textAlign="center"
            >
                <Typography variant="h2" gutterBottom>
                    Welcome to Our Store
                </Typography>
                <Typography variant="h5" paragraph>
                    Discover the best products at unbeatable prices.
                </Typography>
                <Button variant="contained" color="primary" size="large" onClick={handleShopNow}>
                    Shop Now
                </Button>
            </Box>
        </Container>
    );
};

export default LandingClient;
