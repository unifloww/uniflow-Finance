/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { ProtectedRoute } from './components/ProtectedRoute';
import { UserLayout } from './components/UserLayout';
// import { AdminLayout } from './components/AdminLayout';
import { Dashboard } from './pages/Dashboard';
import { Transactions } from './pages/Transactions';
import { Accounts } from './pages/Accounts';
import { Goals } from './pages/Goals';
import { Analytics } from './pages/Analytics';
import { Profile } from './pages/Profile';
import { ThemeToggle } from './components/ThemeToggle';

function LandingPage() {
  const { currentUser, userProfile, loading } = useAuth();
  
  if (loading) return null;
  
  if (currentUser && userProfile) {
    if (userProfile.role === 'superadmin') {
      return <Navigate to="/dashboard" replace />; // Fallback since admin is removed
    }
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-[#059669] to-[#064e3b] relative">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="flex flex-1 flex-col items-center justify-center p-4 text-center">
        <div className="flex items-center justify-center mb-6">
          <img src="https://dash.uniflow.my.id/uniflow-logo-light.png" alt="UniFlow" className="h-14 sm:h-20 w-auto mr-3 object-contain drop-shadow-md" />
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-7xl drop-shadow-md">Finance</h1>
        </div>
        <p className="mb-10 max-w-2xl text-lg sm:text-xl text-emerald-50 leading-relaxed font-medium">
          Atur Dana, Capai Impian. Tracking Pemasukan dan Pengeluaran berdasarkan Kategori secara instan dan aman.
        </p>
        <div className="flex gap-4">
          <Link to="/login" className="rounded-full bg-white px-8 py-3.5 text-sm font-bold text-[#059669] shadow-lg hover:shadow-xl hover:bg-slate-50 transition-all transform hover:-translate-y-0.5">Masuk</Link>
          <Link to="/register" className="rounded-full border border-emerald-300 bg-transparent px-8 py-3.5 text-sm font-bold text-white shadow-md hover:bg-white/10 hover:border-white transition-all">Daftar Gratis</Link>
        </div>
      </div>
      <footer className="py-6 text-center text-sm font-medium text-emerald-100/70">
        &copy; {new Date().getFullYear()} PT LIFIE KARYA NUSANTARA. Hak cipta dilindungi.
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <DataProvider>
          <Router>
            <Routes>
              <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* User Routes */}
            <Route element={<ProtectedRoute allowedRoles={['user', 'superadmin']} />}>
              <Route element={<UserLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/dashboard/accounts" element={<Accounts />} />
                <Route path="/dashboard/transactions" element={<Transactions />} />
                <Route path="/dashboard/goals" element={<Goals />} />
                <Route path="/dashboard/analytics" element={<Analytics />} />
                <Route path="/dashboard/profile" element={<Profile />} />
              </Route>
            </Route>
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </DataProvider>
    </AuthProvider>
    </ThemeProvider>
  );
}

