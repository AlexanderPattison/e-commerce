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
        // Replace with your user verification logic
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
    // Replace with your user retrieval logic
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

    // Define your authentication routes
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

    // Protect routes
    server.get('/admin/*', (req, res, next) => {
        if (!req.isAuthenticated()) {
            return res.redirect('/login');
        }
        next();
    });

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
