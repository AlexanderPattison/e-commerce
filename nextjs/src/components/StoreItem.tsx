"use client";

import React from 'react';
import { Card, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    card: {
        position: 'relative',
        transition: 'transform 0.2s',
        '&:hover': {
            transform: 'scale(1.05)',
        },
    },
    addToCartButton: {
        position: 'absolute',
        bottom: '10px',
        right: '10px',
        color: 'grey',
        '&:hover': {
            color: 'green',
        },
    },
});

const StoreItem = ({ item }) => {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardMedia
                component="img"
                alt={item.name}
                height="140"
                image={item.image}
                title={item.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {item.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {item.description}
                </Typography>
                <Typography variant="h6" color="textPrimary" component="p">
                    ${item.price}
                </Typography>
            </CardContent>
            <IconButton className={classes.addToCartButton} onClick={() => handleAddToCart(item)}>
                <AddShoppingCartIcon />
            </IconButton>
        </Card>
    );
};

const handleAddToCart = (item) => {
    // Implement add to cart functionality here
    console.log('Add to Cart:', item);
};

export default StoreItem;