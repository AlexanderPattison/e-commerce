import { handleAuth, handleLogin, handleLogout, handleCallback, handleProfile } from '@auth0/nextjs-auth0';

export default handleAuth({
    async login(req, res) {
        try {
            await handleLogin(req, res, {
                authorizationParams: {
                    redirect_uri: `${process.env.AUTH0_BASE_URL}/api/auth/callback`,
                },
            });
        } catch (error) {
            res.status(error.status || 500).end(error.message);
        }
    },
    async logout(req, res) {
        try {
            await handleLogout(req, res, {
                returnTo: process.env.AUTH0_BASE_URL,
            });
        } catch (error) {
            res.status(error.status || 500).end(error.message);
        }
    },
    async callback(req, res) {
        try {
            await handleCallback(req, res, {
                afterCallback: (req, res, session, state) => {
                    return session;
                },
            });
        } catch (error) {
            res.status(error.status || 500).end(error.message);
        }
    },
    async profile(req, res) {
        try {
            await handleProfile(req, res);
        } catch (error) {
            res.status(error.status || 500).end(error.message);
        }
    },
});
