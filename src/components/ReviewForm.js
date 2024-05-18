// components/ReviewForm.js
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { TextField, Button, Rating } from '@mui/material';

const ReviewForm = ({ productId }) => {
    const router = useRouter();
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const res = await fetch(`/api/products/${productId}/review`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ rating, comment })
        });

        if (res.ok) {
            alert('Review submitted successfully');
            router.reload();
        } else {
            alert('Failed to submit review');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Rating
                name="rating"
                value={rating}
                onChange={(event, newValue) => setRating(newValue)}
            />
            <TextField
                label="Comment"
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                fullWidth
                multiline
                rows={4}
                margin="normal"
            />
            <Button type="submit" variant="contained" color="primary">
                Submit Review
            </Button>
        </form>
    );
};

export default ReviewForm;
