'use client';

import React, { useState } from 'react';
import { Menu, MenuItem, IconButton, Typography, Link } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useUser } from '../hooks/use-user';

const UserMenu: React.FC = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const { user, isLoading } = useUser();

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    if (isLoading) {
        return null; // or a loading spinner
    }

    return (
        <div>
            <IconButton
                edge="end"
                color="inherit"
                aria-label="account of current user"
                aria-controls="user-menu"
                aria-haspopup="true"
                onClick={handleClick}
            >
                <AccountCircleIcon />
            </IconButton>
            <Menu
                id="user-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {user ? (
                    <>
                        <MenuItem onClick={handleClose}>
                            <Typography variant="body1">Name: {user.name}</Typography>
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <Typography variant="body1">Email: {user.email}</Typography>
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <Link href="/api/auth/logout">Logout</Link>
                        </MenuItem>
                    </>
                ) : (
                    <MenuItem onClick={handleClose}>
                        <Link href="/api/auth/login">Login</Link>
                    </MenuItem>
                )}
            </Menu>
        </div>
    );
};

export default UserMenu;
