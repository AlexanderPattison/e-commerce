'use client'

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { addItem, removeItem, updateQuantity, clearCart } from '../store/cartReducer';

const Cart = () => {
    const items = useSelector((state: RootState) => state.cart.items);
    const dispatch = useDispatch<AppDispatch>();

    const handleAddItem = () => {
        const newItem = {
            id: '1',
            name: 'Sample Item',
            price: 100,
            quantity: 1,
        };
        dispatch(addItem(newItem));
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
            <h1>Shopping Cart</h1>
            <button onClick={handleAddItem}>Add Item</button>
            <button onClick={handleClearCart}>Clear Cart</button>
            <ul>
                {items.map(item => (
                    <li key={item.id}>
                        {item.name} - ${item.price} x {item.quantity}
                        <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
                        <button onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}>+</button>
                        <button onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}>-</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Cart;
