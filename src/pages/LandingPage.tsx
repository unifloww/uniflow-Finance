import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ThemeToggle } from '../components/ThemeToggle';
import { motion } from 'motion/react';
import { CheckCircle2, ChevronRight, Calculator } from 'lucide-react';

export function LandingPage() {
  const { currentUser, userProfile, loading } = useAuth();
  
  const [bocorAlus, setBocorAlus] = useState(50000);
  
  if (loading) return null;
  
  if (currentUser && userProfile) {
    return <Navigate to="/dashboard" replace />;
  }

  const savingsPerYear = bocorAlus * 365;
  const logoUrl = "https://firebasestorage.googleapis.com/v0/b/uniflow/o/Uniflow%20White.png?alt=media&token=ed8e2972-f297-4861-9920-c8145506122d";

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-900 relative selection:bg-[#059669] selection:text-white font-sans overflow-x-hidden">
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      
      {/* Navigation */}
      <nav className="w-full px-6 py-4 flex items-center justify-between absolute top-0 left-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <img src={logoUrl} alt="UniFlow" className="h-16 sm:h-20 w-auto object-contain invert dark:invert-0 drop-shadow-lg" />
          
        </div>
        <div className="hidden sm:flex items-center gap-6">
          <Link to="/login" className="text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-[#059669] dark:hover:text-[#10b981] transition-colors">Masuk</Link>
          <Link to="/register" className="rounded-full bg-[#059669] px-6 py-2.5 text-sm font-bold text-white shadow-lg hover:shadow-xl hover:bg-[#047857] transition-all transform hover:-translate-y-0.5">Mulai Perjalanan Anda</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center px-4 pt-32 pb-16 text-center relative w-full">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none z-0"></div>

        <div className="z-10 max-w-5xl mx-auto flex flex-col items-center w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-sm font-bold mb-8 shadow-sm border border-emerald-200 dark:border-emerald-800">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              🚀 Cara Cerdas Atur Keuangan
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1] mb-6">
              Kendali Penuh Atas Uangmu.<br />
              Masa Depan <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#059669] to-teal-500">Lebih Tenang</span>.
            </h1>
            
            <p className="mb-10 max-w-2xl text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-medium mx-auto">
              Hentikan kebingungan "uang saya lari ke mana?". Lacak pemasukan, cegah pengeluaran impulsif, dan capai tujuan finansial Anda dengan jauh lebih mudah tanpa perlu pusing mikirin rumus rumit.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center mx-auto">
              <Link to="/register" className="rounded-full bg-[#059669] px-8 py-4 text-base font-black text-white shadow-xl shadow-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/40 hover:bg-[#047857] transition-all transform hover:-translate-y-1 w-full sm:w-auto flex items-center justify-center gap-2">
                Bergabung Bersama Kami
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="mt-16 w-full relative">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-50 dark:from-slate-900 via-transparent to-transparent z-10 bottom-0 h-32 mt-auto"></div>
            <img src="https://firebasestorage.googleapis.com/v0/b/uniflow/o/uniflowlaptop.webp?alt=media&token=0d9d0f51-fc5b-4fa4-9c33-56d726453213" alt="UniFlow Dashboard di Laptop" className="w-full max-w-4xl mx-auto rounded-t-3xl shadow-2xl border border-slate-200 dark:border-slate-800 object-cover" />
          </motion.div>
        </div>
      </div>

      {/* Simulator Section (Interactive) */}
      <div className="py-24 bg-white dark:bg-slate-950 relative border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-6 leading-tight">
              Sadar atau Tidak, <br/>Ada <span className="text-rose-500">"Bocor Alus"</span> Setiap Hari.
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
              Kopi kekinian, biaya admin, langganan yang tak terpakai. Mari kita simulasikan seberapa besar potensi kekayaan Anda yang hilang dalam setahun hanya dari kebiasaan kecil.
            </p>
            <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800">
              <div className="flex justify-between items-center mb-4">
                <label className="font-bold text-slate-700 dark:text-slate-300">Pengeluaran "Kecil" Harian</label>
                <span className="text-[#059669] font-black text-xl">Rp {bocorAlus.toLocaleString('id-ID')}</span>
              </div>
              <input 
                type="range" 
                min="5000" 
                max="200000" 
                step="5000"
                value={bocorAlus} 
                onChange={(e) => setBocorAlus(Number(e.target.value))}
                className="w-full h-3 bg-emerald-200 dark:bg-emerald-900 rounded-lg appearance-none cursor-pointer accent-[#059669]"
              />
              <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-1">Potensi Tabungan Anda dalam 1 Tahun</p>
                <div className="text-4xl font-black text-slate-900 dark:text-white">
                  Rp {savingsPerYear.toLocaleString('id-ID')}
                </div>
                <p className="text-sm text-slate-500 mt-3 flex items-start gap-2">
                  <Calculator className="w-4 h-4 mt-0.5 text-[#059669]" />
                  Bayangkan jika dana ini dialokasikan untuk impian keluarga Anda. UniFlow membantu Anda melacak dan menyelamatkannya.
                </p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-emerald-500/20 blur-3xl rounded-full"></div>
            <img src="https://firebasestorage.googleapis.com/v0/b/uniflow/o/uniflowdevicehp.webp?alt=media&token=9b845b00-bb42-4c6b-ac7c-216e6d903211" alt="UniFlow Mobile App" className="relative z-10 w-full max-w-sm mx-auto drop-shadow-2xl hover:scale-105 transition-transform duration-500" />
          </div>
        </div>
      </div>

      {/* Multi-Device / Social Proof */}
      <div className="py-24 bg-slate-50 dark:bg-slate-900 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">
            Selalu Terhubung, Di Mana Pun Anda Berada.
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-16 max-w-2xl mx-auto">
            Kami memahami mobilitas Anda. Akses data keuangan Anda dengan aman dari perangkat apa pun. Bersama membangun ekosistem finansial yang inklusif dan terintegrasi.
          </p>
          
          <img src="https://firebasestorage.googleapis.com/v0/b/uniflow/o/Device.webp?alt=media&token=d016bcde-5287-4f40-a38b-a38966e9fee4" alt="UniFlow Multi Device" className="w-full max-w-5xl mx-auto object-cover rounded-3xl" />
        </div>
      </div>

      {/* Values Section */}
      <div className="py-24 bg-white dark:bg-slate-950">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4">Nilai yang Kami Percayai</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Kami tidak hanya membangun aplikasi, kami membangun budaya finansial yang lebih baik untuk masyarakat.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-[2rem] bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/30">
              <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                <span className="text-2xl">🌱</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Keberlanjutan</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">Keuangan yang sehat berarti hidup yang lebih panjang dan harmonis. Kami membantu Anda memupuk kebiasaan yang bertahan lama.</p>
            </div>
            <div className="p-8 rounded-[2rem] bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30">
              <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Kolaborasi</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">Berjalan bersama. Transparansi keuangan keluarga atau bisnis kecil menjadi lebih mudah dan penuh rasa percaya.</p>
            </div>
            <div className="p-8 rounded-[2rem] bg-rose-50 dark:bg-rose-900/10 border border-rose-100 dark:border-rose-900/30">
              <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Keamanan Privasi</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">Data Anda adalah hak asasi Anda. Kami menjaganya dengan enkripsi tertinggi, bebas dari eksploitasi pihak ketiga.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="py-12 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 text-center relative z-10">
        <div className="max-w-5xl mx-auto px-6 flex flex-col items-center">
          <img src={logoUrl} alt="UniFlow" className="h-20 w-auto object-contain mb-6 invert dark:invert-0 transition-all opacity-80 hover:opacity-100" />
          <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">UniFlow Finance</h4>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-8">Bersama Membangun Kesejahteraan Berkelanjutan.</p>
          <div className="text-sm text-slate-400 dark:text-slate-500">
            &copy; {new Date().getFullYear()} PT LIFIE KARYA NUSANTARA. Hak cipta dilindungi.
          </div>
        </div>
      </footer>
    </div>
  );
}
