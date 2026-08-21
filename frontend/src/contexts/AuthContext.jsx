import { createContext, useContext, useState, useEffect } from "react";

const API_BASE_URL = 'http://localhost:5000/api';

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for token on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('kramik_token');
      const savedUser = localStorage.getItem('kramik_user');

      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
          setIsAuthenticated(true);
        } catch (e) {
          console.error('Failed to parse cached user:', e);
        }
      }

      try {
        const headers = {};
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(`${API_BASE_URL}/auth/me`, {
          headers,
          credentials: 'include'
        });

        if (response.ok) {
          const data = await response.json();
          if (data.user) {
            setUser(data.user);
            setIsAuthenticated(true);
            localStorage.setItem('kramik_user', JSON.stringify(data.user));
          }
        } else if (response.status === 401 || response.status === 403) {
          // Token expired or invalid
          logout();
        }
      } catch (error) {
        console.error('Auth verification failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      if (data.token) {
        localStorage.setItem('kramik_token', data.token);
      }
      localStorage.setItem('kramik_user', JSON.stringify(data.user));
      setUser(data.user);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('API login error:', error);
      throw error;
    }
  };

  const signup = async (fullName, email, password) => {
    if (!fullName || !email || !password) {
      throw new Error('All fields are required');
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ fullName, email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Signup failed');
      }

      if (data.token) {
        localStorage.setItem('kramik_token', data.token);
      }
      localStorage.setItem('kramik_user', JSON.stringify(data.user));
      setUser(data.user);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('API signup error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include'
      });
    } catch (e) {
      // Ignore network errors on logout
    }
    localStorage.removeItem('kramik_token');
    localStorage.removeItem('kramik_user');
    setUser(null);
    setIsAuthenticated(false);
  };

  const googleLogin = async (googleData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(googleData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Google Sign-In failed');
      }

      if (data.token) {
        localStorage.setItem('kramik_token', data.token);
      }
      localStorage.setItem('kramik_user', JSON.stringify(data.user));
      setUser(data.user);
      setIsAuthenticated(true);
      return data.user;
    } catch (error) {
      console.error('API Google login error:', error);
      throw error;
    }
  };


  return (
    <AuthContext.Provider value={{ isAuthenticated, user, isLoading, login, signup, googleLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
