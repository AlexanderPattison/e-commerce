import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the AppBarClient and ProductList components
const AppBar = dynamic(() => import('../../components/AppBar'), { ssr: false });
const ProductList = dynamic(() => import('../../components/ProductList'), { ssr: false });

const HomePage: React.FC = () => {
    return (
        <div>
            <AppBar />
            <h1>Welcome to the E-Commerce App</h1>
            <ProductList />
        </div>
    );
};

export default HomePage;
