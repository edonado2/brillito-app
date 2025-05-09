import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, AuthState, LoginCredentials, RegisterCredentials } from '../types/auth';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (user: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const userJson = await AsyncStorage.getItem('user');
      if (userJson) {
        setState(prev => ({ ...prev, user: JSON.parse(userJson), isLoading: false }));
      } else {
        setState(prev => ({ ...prev, isLoading: false }));
      }
    } catch (error) {
      setState(prev => ({ ...prev, error: 'Failed to load user', isLoading: false }));
    }
  };

  const login = async (credentials: LoginCredentials) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      // TODO: Replace with actual API call
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user: User = {
        id: '1',
        email: credentials.email,
        name: 'John Doe', // This would come from the API
      };

      await AsyncStorage.setItem('user', JSON.stringify(user));
      setState(prev => ({ ...prev, user, isLoading: false }));
    } catch (error) {
      setState(prev => ({ ...prev, error: 'Login failed', isLoading: false }));
    }
  };

  const register = async (credentials: RegisterCredentials) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      // TODO: Replace with actual API call
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user: User = {
        id: '1',
        email: credentials.email,
        name: credentials.name,
        phone: credentials.phone,
        address: credentials.address,
      };

      await AsyncStorage.setItem('user', JSON.stringify(user));
      setState(prev => ({ ...prev, user, isLoading: false }));
    } catch (error) {
      setState(prev => ({ ...prev, error: 'Registration failed', isLoading: false }));
    }
  };

  const logout = async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));
      await AsyncStorage.removeItem('user');
      setState({ user: null, isLoading: false, error: null });
    } catch (error) {
      setState(prev => ({ ...prev, error: 'Logout failed', isLoading: false }));
    }
  };

  const updateUser = async (updates: Partial<User>) => {
    try {
      if (!state.user) throw new Error('No user logged in');
      
      const updatedUser = { ...state.user, ...updates };
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
      setState(prev => ({ ...prev, user: updatedUser }));
    } catch (error) {
      setState(prev => ({ ...prev, error: 'Failed to update user' }));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 