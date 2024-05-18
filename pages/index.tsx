import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Container, Grid, Button, Typography, AppBar, Toolbar, IconButton, InputBase, Card, CardMedia, CardContent, CardActions, Rating, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Search, AccountCircle, ShoppingCart, Favorite, FavoriteBorder } from '@mui/icons-material';
import FilterSort from '../src/components/FilterSort';
import Pagination from '../src/components/Pagination';

const Home = () => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [products, setProducts] = useState([]);
    const [filters, setFilters] = useState({ category: '', priceRange: [0, 1000] });
    const [sort, setSort] = useState('price-asc');  // Initialize sort state with a default value
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const limit = 10;

    useEffect(() => {
        const fetchUser = async () => {
            const res = await fetch('/api/user');
            if (res.ok) {
                const userData = await res.json();
                setUser(userData);
            } else {
                setUser(null);
            }
        };

        fetchUser();
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            const query = new URLSearchParams({
                category: filters.category,
                minPrice: filters.priceRange[0],
                maxPrice: filters.priceRange[1],
                sort,
                search,
                page,
                limit
            }).toString();

            try {
                const res = await fetch(`/api/products?${query}`);
                if (!res.ok) {
                    const errorText = await res.text();
                    console.error('Error fetching products:', errorText);
                    throw new Error(errorText);
                }
                const data = await res.json();
                console.log('Fetched products:', data.products);
                setProducts(data.products);
                setTotal(data.total);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [filters, sort, search, page]);





    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
        setPage(1); // Reset to the first page
    };

    const handleSortChange = (newSort) => {
        setSort(newSort);
        setPage(1); // Reset to the first page
    };

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
        setPage(1); // Reset to the first page
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const handleLogout = async () => {
        await fetch('/logout', { method: 'POST' });
        router.push('/login');
    };

    const handleAddToWishlist = async (productId) => {
        const res = await fetch('/api/wishlist', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ productId })
        });

        if (res.ok) {
            alert('Product added to wishlist');
        }
    };

    const handleRemoveFromWishlist = async (productId) => {
        const res = await fetch(`/api/wishlist/${productId}`, {
            method: 'DELETE'
        });

        if (res.ok) {
            alert('Product removed from wishlist');
        }
    };

    return (
        <Container>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        Logo
                    </Typography>
                    <div style={{ flexGrow: 1 }}>
                        <InputBase
                            placeholder="Search…"
                            value={search}
                            onChange={handleSearchChange}
                        />
                    </div>
                    <IconButton color="inherit">
                        <Search />
                    </IconButton>
                    {user ? (
                        <>
                            <Typography variant="body1" style={{ marginRight: '16px' }}>
                                Welcome, {user.username}
                            </Typography>
                            <Button color="inherit" onClick={handleLogout}>Logout</Button>
                        </>
                    ) : (
                        <Button color="inherit" onClick={() => router.push('/login')}>Login</Button>
                    )}
                    <IconButton color="inherit">
                        <AccountCircle />
                    </IconButton>
                    <IconButton color="inherit" onClick={() => router.push('/wishlist')}>
                        <Favorite />
                    </IconButton>
                    <IconButton color="inherit">
                        <ShoppingCart />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <img src="/hero-image.jpg" alt="Hero" style={{ width: '100%', height: 'auto' }} />
                <Typography variant="h3">Discover Our Latest Collection</Typography>
                <Typography variant="subtitle1">Shop the latest trends in fashion</Typography>
                <Button variant="contained" color="primary">Shop Now</Button>
            </div>

            <FilterSort onFilterChange={handleFilterChange} onSortChange={handleSortChange} />

            <Grid container spacing={4} style={{ marginTop: '20px' }}>
                {products.length > 0 ? (
                    products.map((product) => (
                        <Grid item key={product.id} xs={12} sm={6} md={4}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    alt="Product Image"
                                    height="140"
                                    image={product.imageUrl}
                                />
                                <CardContent>
                                    <Typography variant="h5">{product.name}</Typography>
                                    <Typography variant="body2">${product.price}</Typography>
                                    <Rating name="read-only" value={product.rating} readOnly />
                                    <Typography variant="body2">{product.reviewCount} reviews</Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" color="primary">Add to Cart</Button>
                                    {user ? (
                                        <IconButton color="secondary" onClick={() => handleAddToWishlist(product.id)}>
                                            <FavoriteBorder />
                                        </IconButton>
                                    ) : (
                                        <IconButton color="secondary" onClick={() => router.push('/login')}>
                                            <FavoriteBorder />
                                        </IconButton>
                                    )}
                                </CardActions>
                            </Card>
                        </Grid>
                    ))
                ) : (
                    <Typography variant="body1" style={{ marginTop: '20px' }}>
                        No products found.
                    </Typography>
                )}
            </Grid>

            <Pagination
                total={total}
                page={page}
                limit={limit}
                onPageChange={handlePageChange}
            />

            <div style={{ marginTop: '40px', textAlign: 'center' }}>
                <Typography variant="h4">Featured Collections</Typography>
                <Grid container spacing={4} style={{ marginTop: '20px' }}>
                    {[1, 2].map((item) => (
                        <Grid item key={item} xs={12} sm={6}>
                            <img src={`/featured-${item}.jpg`} alt={`Featured ${item}`} style={{ width: '100%', height: 'auto' }} />
                            <Typography variant="h5">Collection {item}</Typography>
                            <Button variant="outlined" color="primary">View Collection</Button>
                        </Grid>
                    ))}
                </Grid>
            </div>

            <div style={{ marginTop: '40px', textAlign: 'center' }}>
                <Typography variant="body2">© 2024 E-Commerce App</Typography>
                <div>
                    <a href="/privacy-policy">Privacy Policy</a> | <a href="/terms-of-service">Terms of Service</a>
                </div>
                <div>
                    <IconButton color="inherit">
                        <span>FB</span>
                    </IconButton>
                    <IconButton color="inherit">
                        <span>TW</span>
                    </IconButton>
                    <IconButton color="inherit">
                        <span>IG</span>
                    </IconButton>
                </div>
                <div>
                    <Typography variant="body2">Subscribe to our newsletter</Typography>
                    <InputBase placeholder="Email…" />
                    <Button variant="contained" color="primary">Subscribe</Button>
                </div>
            </div>
        </Container>
    );
};

export default Home;
