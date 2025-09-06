
'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { account } from '@/lib/appwrite';
import { Models } from 'appwrite';
import { useRouter, usePathname } from 'next/navigation';

type AuthContextType = {
  user: Models.User<Models.Preferences> | null;
  loading: boolean;
  setUser: (user: Models.User<Models.Preferences> | null) => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  setUser: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log('Checking authentication...');
        const userData = await account.get();
        console.log('User data:', userData);
        setUser(userData);
        
        // Redirect to dashboard if user is authenticated and on auth pages
        if (userData && (pathname === '/login' || pathname === '/signup')) {
          console.log('Redirecting to dashboard...');
          router.push('/dashboard');
        }
      } catch (error) {
        console.error('Authentication error:', error);
        setUser(null);
        
        // Redirect to login if user is not authenticated and on protected pages
        if (pathname.startsWith('/dashboard')) {
          console.log('Redirecting to login...');
          router.push('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [pathname, router]);

  return (
    <AuthContext.Provider value={{ user, loading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
