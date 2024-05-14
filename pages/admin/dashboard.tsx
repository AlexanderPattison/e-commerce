import React from 'react';
import { useAuthenticated } from '@refinedev/core';

const AdminDashboard = () => {
  useAuthenticated();

  return <div>Welcome to the Admin Dashboard!</div>;
};

export default AdminDashboard;
