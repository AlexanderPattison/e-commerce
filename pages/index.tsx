import React from 'react';
import { NextPage } from 'next';
import { Container, Typography, Grid, Card, CardContent, CardMedia, Button } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'; // Importing a shopping cart icon from MUI

const HomePage: NextPage = () => {
    const products = [
        { id: 1, name: 'Product 1', description: 'This is product 1', imageUrl: '/images/product1.jpg', price: '$10' },
        { id: 2, name: 'Product 2', description: 'This is product 2', imageUrl: '/images/product2.jpg', price: '$20' },
        // Add more products as needed
    ];

    return (
        <Container>
            <Typography variant="h2" component="h1" gutterBottom>
                Welcome to Our E-Commerce Store
            </Typography>
            <Grid container spacing={4}>
                {products.map(product => (
                    <Grid item key={product.id} xs={12} sm={6} md={4}>
                        <Card>
                            <CardMedia
                                component="img"
                                alt={product.name}
                                height="140"
                                image={product.imageUrl}
                                title={product.name}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {product.name}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {product.description}
                                </Typography>
                                <Typography variant="h6" component="p">
                                    {product.price}
                                </Typography>
                            </CardContent>
                            <Button size="small" color="primary" startIcon={<ShoppingCartIcon />}>
                                Add to Cart
                            </Button>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default HomePage;
