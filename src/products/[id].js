// pages/product/[id].js
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Container, Typography, Card, CardMedia, CardContent, CardActions, Rating, Grid } from '@mui/material';
import ReviewForm from '../../components/ReviewForm';

const ProductDetail = () => {
    const router = useRouter();
    const { id } = router.query;
    const [product, setProduct] = useState(null);

    useEffect(() => {
        if (id) {
            const fetchProduct = async () => {
                const res = await fetch(`/api/products/${id}`);
                const data = await res.json();
                setProduct(data);
            };

            fetchProduct();
        }
    }, [id]);

    if (!product) return <p>Loading...</p>;

    return (
        <Container>
            <Card>
                <CardMedia
                    component="img"
                    alt="Product Image"
                    height="400"
                    image={product.imageUrl}
                />
                <CardContent>
                    <Typography variant="h4">{product.name}</Typography>
                    <Typography variant="body1">${product.price}</Typography>
                    <Rating name="read-only" value={product.rating} readOnly />
                    <Typography variant="body2">{product.reviewCount} reviews</Typography>
                    <Typography variant="body1">{product.description}</Typography>
                </CardContent>
            </Card>

            <div style={{ marginTop: '20px' }}>
                <Typography variant="h5">Customer Reviews</Typography>
                {product.reviews.map((review) => (
                    <div key={review.id} style={{ marginBottom: '16px' }}>
                        <Rating name="read-only" value={review.rating} readOnly />
                        <Typography variant="body1">{review.comment}</Typography>
                        <Typography variant="body2">- {review.username}</Typography>
                    </div>
                ))}
            </div>

            <ReviewForm productId={product.id} />
        </Container>
    );
};

export default ProductDetail;
