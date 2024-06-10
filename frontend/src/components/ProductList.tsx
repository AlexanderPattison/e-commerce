'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { addItem } from '../store/cartReducer';
import { Box, Typography } from '@mui/material';
import ItemBox from './ItemBox';

interface Product {
    id: string;
    name: string;
    price: number;
}

const ProductList: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [items, setItems] = useState<Product[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:3001/products');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setItems(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleAddToCart = (id: string, name: string, price: number) => {
        const newItem = {
            id,
            name,
            price,
            quantity: 1,
        };
        dispatch(addItem(newItem));
    };

    return (
        <Box>
            <Typography variant="h4" sx={{ margin: '16px 0' }}>
                Products
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                {items.length > 0 ? (
                    items.map((item) => (
                        <ItemBox
                            key={item.id}
                            id={item.id}
                            name={item.name}
                            price={item.price}
                            onAddToCart={handleAddToCart}
                        />
                    ))
                ) : (
                    <Typography variant="body1" sx={{ padding: '16px' }}>
                        No products available.
                    </Typography>
                )}
            </Box>
        </Box>
    );
};

export default ProductList;
