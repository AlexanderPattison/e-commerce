// components/Pagination.js
import React from 'react';
import { Pagination as MuiPagination } from '@mui/material';

const Pagination = ({ total, page, limit, onPageChange }) => {
    const pageCount = Math.ceil(total / limit);

    return (
        <MuiPagination
            count={pageCount}
            page={page}
            onChange={(event, value) => onPageChange(value)}
            color="primary"
        />
    );
};

export default Pagination;
