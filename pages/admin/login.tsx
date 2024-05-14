// pages/admin/login.tsx
import React from 'react';
import { useLogin } from '@refinedev/core';
import { TextField, Button } from '@mui/material';

const AdminLogin = () => {
  const { mutate: login } = useLogin();

  const handleLogin = (e) => {
    e.preventDefault();
    login({});
  };

  return (
    <form onSubmit={handleLogin}>
      <TextField name="email" label="Email" />
      <TextField name="password" label="Password" type="password" />
      <Button type="submit">Login</Button>
    </form>
  );
};

export default AdminLogin;
