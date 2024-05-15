import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Admin = () => {
    const router = useRouter();

    const handleLogout = async () => {
        await fetch('/logout', { method: 'POST' });
        router.push('/login');
    };

    useEffect(() => {
        // Fetch user data or perform any initialization if needed
    }, []);

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Admin;
