'use client';

import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, InputBase } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import UserMenu from './UserMenu';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

const CartDropdown = dynamic(() => import('./CartMenu'), { ssr: false });

const AppBarClient: React.FC = () => {
    const [user, setUser] = useState({ name: '', email: '' });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/auth/me');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setUser(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user profile:', error);
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" noWrap style={{ flexGrow: 1 }}>
                    <Link href="/homepage" passHref>
                        Home
                    </Link>
                </Typography>
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </Search>
                <div style={{ flexGrow: 1 }} />
                <CartDropdown />
                {!loading && <UserMenu user={user} />}
            </Toolbar>
        </AppBar>
    );
};

export default AppBarClient;
