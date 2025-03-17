import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  USER: 'user'
};

export const PERMISSIONS = {
  CREATE_DISCUSSION: ['admin', 'manager', 'user'],
  DELETE_DISCUSSION: ['admin', 'manager'],
  MANAGE_USERS: ['admin'],
  ACCESS_PREMIUM_RESOURCES: ['admin', 'manager'],
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: ROLES.MANAGER,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e'
  });

  const hasPermission = (permission) => {
    return PERMISSIONS[permission]?.includes(user?.role) || false;
  };

  const value = {
    user,
    setUser,
    hasPermission,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};