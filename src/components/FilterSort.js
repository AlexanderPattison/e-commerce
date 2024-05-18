// components/FilterSort.js
import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Slider, Button } from '@mui/material';

const FilterSort = ({ onFilterChange, onSortChange }) => {
    const [category, setCategory] = useState('');
    const [priceRange, setPriceRange] = useState([0, 1000]);

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
        onFilterChange({ category: event.target.value, priceRange });
    };

    const handlePriceRangeChange = (event, newValue) => {
        setPriceRange(newValue);
        onFilterChange({ category, priceRange: newValue });
    };

    const handleSortChange = (event) => {
        onSortChange(event.target.value);
    };

    return (
        <div>
            <FormControl fullWidth style={{ marginBottom: '16px' }}>
                <InputLabel>Category</InputLabel>
                <Select value={category} onChange={handleCategoryChange}>
                    <MenuItem value=""><em>None</em></MenuItem>
                    <MenuItem value="clothing">Clothing</MenuItem>
                    <MenuItem value="electronics">Electronics</MenuItem>
                    <MenuItem value="home">Home</MenuItem>
                </Select>
            </FormControl>

            <FormControl fullWidth style={{ marginBottom: '16px' }}>
                <InputLabel>Sort By</InputLabel>
                <Select onChange={handleSortChange}>
                    <MenuItem value="price-asc">Price: Low to High</MenuItem>
                    <MenuItem value="price-desc">Price: High to Low</MenuItem>
                    <MenuItem value="popularity">Popularity</MenuItem>
                </Select>
            </FormControl>

            <div style={{ marginBottom: '16px' }}>
                <InputLabel>Price Range</InputLabel>
                <Slider
                    value={priceRange}
                    onChange={handlePriceRangeChange}
                    valueLabelDisplay="auto"
                    min={0}
                    max={1000}
                />
            </div>
        </div>
    );
};

export default FilterSort;
