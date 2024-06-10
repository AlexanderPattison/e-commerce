import { handleAuth } from '@auth0/nextjs-auth0';
import auth0 from '../../../../auth0';

export default handleAuth({
    logout: auth0.handleLogout({
        returnTo: process.env.AUTH0_BASE_URL, // Ensure this matches your application's base URL
        onError: (error, req, res) => {
            console.error('Logout error:', error);
            res.status(error.status || 500).end(error.message);
        },
    }),
});
