import { getSession } from '@auth0/nextjs-auth0';

export default async function handler(req, res) {
    try {
        const session = await getSession(req, res);
        if (session) {
            res.status(200).json(session.user);
        } else {
            res.status(401).json({ error: 'Not authenticated' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
