import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const Home = () => {
    const router = useRouter();
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Fetch user data to check if the user is logged in
        const fetchUser = async () => {
            const res = await fetch('/api/user'); // Adjust this endpoint based on your new setup
            if (res.ok) {
                const userData = await res.json();
                setUser(userData);
            } else {
                setUser(null);
            }
        };

        fetchUser();
    }, []);

    const handleLogout = async () => {
        await fetch('/logout', { method: 'POST' });
        router.push('/login');
    };

    return (
        <div>
            <h1>Welcome to the E-commerce App</h1>
            {user ? (
                <div>
                    <p>Welcome, {user.username}!</p>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <button onClick={() => router.push('/login')}>Login</button>
            )}
        </div>
    );
};

export default Home;
