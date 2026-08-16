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
      return <Navigate to="/dashboard" replace />;
    }
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-900 relative selection:bg-[#059669] selection:text-white">
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      
      {/* Navigation */}
      <nav className="w-full px-6 py-4 flex items-center justify-between absolute top-0 left-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center">
          <img src="https://dash.uniflow.my.id/uniflow-logo-light.png" alt="UniFlow" className="h-8 sm:h-10 w-auto mr-2 object-contain" />
          <span className="text-xl font-bold text-slate-900 dark:text-white">Finance</span>
        </div>
        <div className="hidden sm:flex items-center gap-4">
          <Link to="/login" className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-[#059669] dark:hover:text-[#10b981] transition-colors">Masuk</Link>
          <Link to="/register" className="rounded-full bg-[#059669] px-5 py-2.5 text-sm font-bold text-white shadow-lg hover:shadow-xl hover:bg-[#047857] transition-all transform hover:-translate-y-0.5">Coba Gratis 14 Hari</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-1 flex-col items-center justify-center px-4 pt-32 pb-20 text-center relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#059669]/20 blur-[120px] rounded-full pointer-events-none z-0"></div>
        <div className="absolute bottom-0 left-0 w-full h-[300px] bg-gradient-to-t from-white dark:from-slate-900 to-transparent z-0"></div>

        <div className="z-10 max-w-4xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-sm font-bold mb-8 shadow-sm border border-emerald-200 dark:border-emerald-800">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            Rahasia Bebas Finansial di 2024
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1] mb-6">
            Berhenti <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Bocor Alus</span>.<br />
            Mulai Bangun Kekayaan <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#059669] to-teal-400">Hari Ini</span>.
          </h1>
          
          <p className="mb-10 max-w-2xl text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
            Lebih dari <strong>10.000+</strong> orang telah membuktikan. Hentikan kebingungan "uang saya lari ke mana?". Catat, pantau, dan capai kebebasan finansial Anda bersama UniFlow Finance.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link to="/register" className="rounded-full bg-[#059669] px-8 py-4 text-base font-black text-white shadow-xl shadow-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/40 hover:bg-[#047857] transition-all transform hover:-translate-y-1 w-full sm:w-auto flex items-center justify-center gap-2">
              Daftar Sekarang - GRATIS!
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </Link>
            <Link to="/login" className="rounded-full bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 px-8 py-4 text-base font-bold text-slate-700 dark:text-slate-200 hover:border-[#059669] dark:hover:border-[#059669] hover:text-[#059669] dark:hover:text-[#34d399] transition-all w-full sm:w-auto flex items-center justify-center">
              Saya Sudah Punya Akun
            </Link>
          </div>
          
          <div className="mt-8 flex items-center gap-4 text-sm font-semibold text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-1"><svg className="w-5 h-5 text-[#059669]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg> Tanpa Kartu Kredit</div>
            <div className="flex items-center gap-1"><svg className="w-5 h-5 text-[#059669]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg> Batal Kapan Saja</div>
          </div>
        </div>

        {/* Feature Highlights - Social Proof */}
        <div className="z-10 w-full max-w-5xl mx-auto mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-[2rem] shadow-xl border border-slate-100 dark:border-slate-700">
            <div className="w-12 h-12 bg-rose-100 dark:bg-rose-900/30 rounded-2xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-rose-600 dark:text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"/></svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Stop Kebocoran Dana</h3>
            <p className="text-slate-600 dark:text-slate-400">Deteksi pengeluaran tak perlu secara otomatis. Hemat jutaan rupiah setiap bulannya tanpa terasa.</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-[2rem] shadow-xl border border-slate-100 dark:border-slate-700">
            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Analitik Mendalam</h3>
            <p className="text-slate-600 dark:text-slate-400">Dashboard intuitif yang menyajikan data rumit menjadi wawasan finansial yang sangat mudah dipahami.</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-[2rem] shadow-xl border border-slate-100 dark:border-slate-700">
            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-[#059669] dark:text-[#34d399]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Keamanan Bank</h3>
            <p className="text-slate-600 dark:text-slate-400">Data finansial Anda dilindungi dengan enkripsi tingkat militer. 100% aman dan terjaga kerahasiaannya.</p>
          </div>
        </div>
      </div>
      
      <footer className="py-8 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 text-center text-sm font-medium text-slate-500 dark:text-slate-400 z-10 relative">
        <div className="mb-4">
          <img src="https://dash.uniflow.my.id/uniflow-logo-light.png" alt="UniFlow" className="h-8 w-auto mx-auto grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all" />
        </div>
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

