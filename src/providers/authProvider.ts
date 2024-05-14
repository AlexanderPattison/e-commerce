// src/providers/authProvider.ts
import { AuthProvider } from '@refinedev/core';
import { useAuth0 } from '@auth0/auth0-react';

const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    const { loginWithRedirect } = useAuth0();
    await loginWithRedirect();
    return { success: true };
  },
  logout: async () => {
    const { logout } = useAuth0();
    logout({ returnTo: window.location.origin });
    return { success: true };
  },
  checkAuth: async () => {
    const { isAuthenticated } = useAuth0();
    if (!isAuthenticated) {
      throw new Error('User is not authenticated');
    }
  },
  getPermissions: async () => null,
  getIdentity: async () => {
    const { user } = useAuth0();
    return user ? { ...user } : null;
  }
};

export default authProvider;
