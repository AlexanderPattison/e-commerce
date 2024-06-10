const express = require('express');
const cors = require('cors');
const { sequelize, Product } = require('./models'); // Import sequelize and Product model

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Mock function to get user from token (Replace with real implementation)
const getUserFromToken = (token) => {
    // Decode token and fetch user from DB or any other service
    // This is just a mock implementation; replace it with your actual logic
    if (token === 'valid-token') {
        return { id: '1', name: 'John Doe', email: 'john.doe@example.com' }; // Replace with real user fetching
    }
    return null;
};

// Middleware to authenticate user
const authenticateUser = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Assuming Bearer token
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const user = getUserFromToken(token);
    if (!user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    req.user = user; // Attach user to request object
    next();
};

app.get('/api/auth/me', authenticateUser, async (req, res) => {
    try {
        const user = req.user; // Use the authenticated user
        res.json(user);
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ error: 'An error occurred while fetching user profile' });
    }
});

app.get('/products', async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'An error occurred while fetching products' });
    }
});

app.listen(port, async () => {
    console.log(`Backend server is running on http://localhost:${port}`);
    try {
        await sequelize.sync(); // Ensure database is synced
        console.log('Database synced successfully');
    } catch (error) {
        console.error('Error syncing database:', error);
    }
});
