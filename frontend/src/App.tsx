/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { Hero } from './components/Hero';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AuthPage } from './components/AuthPage';
import { ProfilePage } from './components/ProfilePage';
import { DashboardLayout } from './components/dashboard/DashboardLayout';
import { SubjectDetailPage } from './components/dashboard/SubjectDetailPage';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { AnimatePresence, motion } from 'motion/react';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  return <>{children}</>;
}

function LandingPage() {
  return (
    <div className="min-h-screen bg-[var(--color-navy)] text-white font-sans selection:bg-[#B5FF45]/30 flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
      </main>
      <Footer />
    </div>
  );
}

function AppRoutes() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = () => {
    logout();
    navigate('/');
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col min-h-screen"
      >
        <Routes location={location}>
          <Route path="/" element={<LandingPage />} />
          
          <Route path="/login" element={
            <PublicRoute>
              <AuthPage 
                onBack={() => navigate('/')} 
                onSuccess={() => navigate('/dashboard')} 
              />
            </PublicRoute>
          } />
          
          <Route path="/signup" element={
            <PublicRoute>
              <AuthPage 
                onBack={() => navigate('/')} 
                onSuccess={() => navigate('/dashboard')} 
              />
            </PublicRoute>
          } />

          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardLayout 
                onSignOut={handleSignOut}
                onNavigateToProfile={() => navigate('/profile')}
              />
            </ProtectedRoute>
          } />

          <Route path="/profile" element={
            <ProtectedRoute>
              <ProfilePage 
                onSignOut={handleSignOut}
                onNavigateToDashboard={() => navigate('/dashboard')}
              />
            </ProtectedRoute>
          } />

          <Route path="/subjects" element={
            <ProtectedRoute>
              <DashboardLayout 
                onSignOut={handleSignOut}
                onNavigateToProfile={() => navigate('/profile')}
                initialTab="subjects"
              />
            </ProtectedRoute>
          } />

          <Route path="/subjects/:id" element={
            <ProtectedRoute>
              <DashboardLayout 
                onSignOut={handleSignOut}
                onNavigateToProfile={() => navigate('/profile')}
                initialTab="subject-detail"
              />
            </ProtectedRoute>
          } />

          <Route path="/mock-tests" element={
            <ProtectedRoute>
              <DashboardLayout 
                onSignOut={handleSignOut}
                onNavigateToProfile={() => navigate('/profile')}
                initialTab="mock-tests"
              />
            </ProtectedRoute>
          } />

          <Route path="/mock-test-result" element={
            <ProtectedRoute>
              <DashboardLayout 
                onSignOut={handleSignOut}
                onNavigateToProfile={() => navigate('/profile')}
                initialTab="mock-test-result"
              />
            </ProtectedRoute>
          } />

          <Route path="/mock-test-result" element={
            <ProtectedRoute>
              <DashboardLayout 
                onSignOut={handleSignOut}
                onNavigateToProfile={() => navigate('/profile')}
                initialTab="mock-test-result"
              />
            </ProtectedRoute>
          } />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
