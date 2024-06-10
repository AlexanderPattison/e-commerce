'use client';

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { removeItem, updateQuantity, clearCart } from '../store/cartReducer';
import { Box, IconButton, Menu, MenuItem, Typography, Button } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';

const CartDropdown = () => {
    const items = useSelector((state: RootState) => state.cart.items);
    const dispatch = useDispatch<AppDispatch>();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleCartClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleRemoveItem = (id: string) => {
        dispatch(removeItem(id));
    };

    const handleUpdateQuantity = (id: string, quantity: number) => {
        dispatch(updateQuantity({ id, quantity }));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    return (
        <div>
            <IconButton color="inherit" onClick={handleCartClick}>
                <ShoppingCart />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                keepMounted
            >
                <Box sx={{ width: 300 }}>
                    <Typography variant="h6" sx={{ padding: 1 }}>
                        Shopping Cart
                    </Typography>
                    {items.length === 0 ? (
                        <Typography variant="body1" sx={{ padding: 1 }}>
                            Your cart is empty.
                        </Typography>
                    ) : (
                        items.map(item => (
                            <MenuItem key={item.id} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Box>
                                    <Typography variant="body1">{item.name}</Typography>
                                    <Typography variant="body2">${item.price} x {item.quantity}</Typography>
                                </Box>
                                <Box>
                                    <IconButton onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}>+</IconButton>
                                    <IconButton onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}>-</IconButton>
                                    <IconButton onClick={() => handleRemoveItem(item.id)}>Remove</IconButton>
                                </Box>
                            </MenuItem>
                        ))
                    )}
                    {items.length > 0 && (
                        <MenuItem>
                            <Button onClick={handleClearCart} fullWidth>Clear Cart</Button>
                        </MenuItem>
                    )}
                </Box>
            </Menu>
        </div>
    );
};

export default CartDropdown;
