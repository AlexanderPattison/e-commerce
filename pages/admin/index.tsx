import React from 'react';
import { Container, Typography, Grid, Card, CardContent, CardActions, Button } from '@mui/material';
import { AddCircle as AddCircleIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

const AdminPage: React.FC = () => {
    const items = [
        { id: 1, name: 'Item 1', description: 'This is item 1' },
        { id: 2, name: 'Item 2', description: 'This is item 2' },
        // Add more items as needed
    ];

    return (
        <Container>
            <Typography variant="h2" component="h1" gutterBottom>
                Admin Dashboard
            </Typography>
            <Button variant="contained" color="primary" startIcon={<AddCircleIcon />}>
                Add New Item
            </Button>
            <Grid container spacing={4} style={{ marginTop: '20px' }}>
                {items.map(item => (
                    <Grid item key={item.id} xs={12} sm={6} md={4}>
                        <Card>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {item.name}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {item.description}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="primary" startIcon={<EditIcon />}>
                                    Edit
                                </Button>
                                <Button size="small" color="secondary" startIcon={<DeleteIcon />}>
                                    Delete
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default AdminPage;
