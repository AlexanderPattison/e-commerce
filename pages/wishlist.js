// pages/wishlist.js
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Container, Grid, Typography, Card, CardMedia, CardContent, CardActions, Button, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';

const Wishlist = () => {
    const router = useRouter();
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        const fetchWishlist = async () => {
            const res = await fetch('/api/wishlist');
            if (res.ok) {
                const data = await res.json();
                setWishlist(data);
            } else {
                setWishlist([]);
            }
        };

        fetchWishlist();
    }, []);

    const handleRemoveFromWishlist = async (productId) => {
        const res = await fetch(`/api/wishlist/${productId}`, {
            method: 'DELETE'
        });

        if (res.ok) {
            setWishlist(wishlist.filter(product => product.id !== productId));
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                My Wishlist
            </Typography>
            <Grid container spacing={4}>
                {wishlist.map((product) => (
                    <Grid item key={product.id} xs={12} sm={6} md={4}>
                        <Card>
                            <CardMedia
                                component="img"
                                alt="Product Image"
                                height="140"
                                image={product.imageUrl}
                            />
                            <CardContent>
                                <Typography variant="h5">{product.name}</Typography>
                                <Typography variant="body2">${product.price}</Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="primary">View</Button>
                                <IconButton color="secondary" onClick={() => handleRemoveFromWishlist(product.id)}>
                                    <Delete />
                                </IconButton>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Wishlist;
