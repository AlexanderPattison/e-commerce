import { withApiAuthRequired } from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async function handler(req, res) {
    res.status(200).json({ message: 'This is a protected API route' });
});
