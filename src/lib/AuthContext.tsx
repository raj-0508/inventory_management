
'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { account } from '@/lib/appwrite';
import { Models } from 'appwrite';

type AuthContextType = {
  user: Models.User<Models.Preferences> | null;
  loading: boolean;
  setUser: (user: Models.User<Models.Preferences> | null) => void;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string, mobile: string, age: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  setUser: () => {},
  login: async () => {},
  signup: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log('Checking authentication...');
        const userData = await account.get();
        console.log('User authenticated:', userData);
        setUser(userData);
      } catch (error) {
        console.log('No user session found');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      console.log('Attempting login...');
      await account.createEmailPasswordSession(email, password);
      const userData = await account.get();
      setUser(userData);
      console.log('Login successful:', userData);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const signup = async (email: string, password: string, name: string, mobile: string, age: string) => {
    try {
      console.log('Attempting signup...');
      await account.create(Models.ID.unique(), email, password, name);
      await account.createEmailPasswordSession(email, password);
      await account.updatePrefs({ mobile, age });
      const userData = await account.get();
      setUser(userData);
      console.log('Signup successful:', userData);
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await account.deleteSession('current');
      setUser(null);
      console.log('Logout successful');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, setUser, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
