import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';

export const GET = withApiAuthRequired(async (req, res) => {
    try {
        const session = getSession(req, res);
        console.log('Session:', session);
        if (!session) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        res.status(200).json(session.user);
    } catch (error) {
        console.error('Failed to get user profile:', error);
        res.status(500).json({ error: 'Failed to get user profile' });
    }
});
