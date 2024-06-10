'use client';

import React, { useState } from 'react';
import { Menu, MenuItem, IconButton, Typography, Link } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

interface UserMenuProps {
    user?: {
        name: string;
        email: string;
    };
}

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

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
                            <Link href="/api/auth0/logout">Logout</Link>
                        </MenuItem>
                    </>
                ) : (
                    <MenuItem onClick={handleClose}>
                        <Link href="/api/auth0/login">Login</Link>
                    </MenuItem>
                )}
            </Menu>
        </div>
    );
};

export default UserMenu;
