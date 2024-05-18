const express = require('express');
const next = require('next');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

passport.use(new LocalStrategy(
    (username, password, done) => {
        if (username === 'admin' && password === 'password') {
            return done(null, { id: 1, username: 'admin' });
        }
        return done(null, false, { message: 'Incorrect credentials.' });
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    done(null, { id: 1, username: 'admin' });
});

app.prepare().then(() => {
    const server = express();

    server.use(express.json());
    server.use(express.urlencoded({ extended: true }));

    server.use(session({
        secret: 'your-secret',
        resave: false,
        saveUninitialized: true,
    }));

    server.use(passport.initialize());
    server.use(passport.session());

    server.post('/login', (req, res, next) => {
        passport.authenticate('local', (err, user, info) => {
            if (err) return next(err);
            if (!user) return res.status(401).json({ message: info.message });

            req.logIn(user, (err) => {
                if (err) return next(err);
                return res.json({ user });
            });
        })(req, res, next);
    });

    server.post('/logout', (req, res) => {
        req.logout();
        res.json({ message: 'Logged out' });
    });

    server.get('/admin/*', (req, res, next) => {
        if (!req.isAuthenticated()) {
            return res.redirect('/login');
        }
        next();
    });

    // Add API endpoint for fetching user data
    server.get('/api/user', (req, res) => {
        if (req.isAuthenticated()) {
            res.json(req.user);
        } else {
            res.status(401).json({ message: 'Not authenticated' });
        }
    });

    // Add API endpoint for fetching products
    server.get('/api/products', (req, res) => {
        const { category, minPrice, maxPrice, sort, page = 1, limit = 10, search } = req.query;

        let products = getProductsFromDatabase();
        console.log('Initial Products:', products);

        // Apply filters
        if (category) {
            products = products.filter(product => product.category === category);
        }
        if (minPrice !== undefined && maxPrice !== undefined) {
            products = products.filter(product => product.price >= parseInt(minPrice, 10) && product.price <= parseInt(maxPrice, 10));
        }
        if (search) {
            products = products.filter(product => product.name.toLowerCase().includes(search.toLowerCase()));
        }
        console.log('Filtered Products:', products);

        // Apply sorting
        if (sort) {
            if (sort === 'price-asc') {
                products.sort((a, b) => a.price - b.price);
            } else if (sort === 'price-desc') {
                products.sort((a, b) => b.price - a price);
            } else if (sort === 'popularity') {
                products.sort((a, b) => b.rating - a.rating);
            }
        }
        console.log('Sorted Products:', products);

        // Apply pagination
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const paginatedProducts = products.slice(startIndex, endIndex);

        console.log('Paginated Products:', paginatedProducts);

        res.json({
            total: products.length,
            page,
            limit,
            products: paginatedProducts
        });
    });

    function getProductsFromDatabase() {
        // Mock data for demonstration
        return [
            { id: 1, name: 'Product 1', category: 'clothing', price: 50, rating: 4.5, reviewCount: 10, imageUrl: '/product-1.jpg' },
            { id: 2, name: 'Product 2', category: 'electronics', price: 300, rating: 4.0, reviewCount: 20, imageUrl: '/product-2.jpg' },
            { id: 3, name: 'Product 3', category: 'clothing', price: 75, rating: 3.5, reviewCount: 5, imageUrl: '/product-3.jpg' },
            { id: 4, name: 'Product 4', category: 'home', price: 100, rating: 4.8, reviewCount: 12, imageUrl: '/product-4.jpg' },
            { id: 5, name: 'Product 5', category: 'electronics', price: 150, rating: 4.2, reviewCount: 8, imageUrl: '/product-5.jpg' },
            { id: 6, name: 'Product 6', category: 'clothing', price: 60, rating: 4.0, reviewCount: 7, imageUrl: '/product-6.jpg' },
            { id: 7, name: 'Product 7', category: 'home', price: 200, rating: 4.7, reviewCount: 15, imageUrl: '/product-7.jpg' },
            { id: 8, name: 'Product 8', category: 'electronics', price: 250, rating: 3.9, reviewCount: 10, imageUrl: '/product-8.jpg' },
            { id: 9, name: 'Product 9', category: 'clothing', price: 90, rating: 4.3, reviewCount: 6, imageUrl: '/product-9.jpg' },
            { id: 10, name: 'Product 10', category: 'home', price: 120, rating: 4.1, reviewCount: 11, imageUrl: '/product-10.jpg' },
        ];
    }

    // Handle Next.js routes
    server.all('*', (req, res) => {
        return handle(req, res);
    });

    const port = process.env.PORT || 3000;
    server.listen(port, (err) => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`);
    });
});
