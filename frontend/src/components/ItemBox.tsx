'use client';

import React from 'react';
import { Box, Typography, Button } from '@mui/material';

interface ItemBoxProps {
    id: string;
    name: string;
    price: number;
    onAddToCart: (id: string, name: string, price: number) => void;
}

const ItemBox: React.FC<ItemBoxProps> = ({ id, name, price, onAddToCart }) => {
    return (
        <Box sx={{ border: '1px solid grey', borderRadius: '4px', padding: '16px', margin: '8px' }}>
            <Typography variant="h6">{name}</Typography>
            <Typography variant="body1">Price: ${price}</Typography>
            <Button variant="contained" color="primary" onClick={() => onAddToCart(id, name, price)}>
                Add to Cart
            </Button>
        </Box>
    );
};

export default ItemBox;
