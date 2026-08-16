import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { User, Phone, Mail, ShieldCheck, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";

export function Profile() {
  const { userProfile, updateProfile } = useAuth();
  
  const [name, setName] = useState(userProfile?.name || "");
  const [phone, setPhone] = useState(userProfile?.phone || "");
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate network delay
    setTimeout(async () => {
      await updateProfile({ name, phone });
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 600);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold tracking-tight text-white">Profil Pengguna</h1>
        <p className="text-sm text-emerald-100">Atur informasi pribadi dan preferensi akun Anda.</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card className="rounded-[2rem] border-0 shadow-xl bg-white dark:bg-slate-900 overflow-hidden">
          <CardHeader className="bg-slate-50 dark:bg-slate-800/50/50 border-b border-slate-50 pb-6 pt-8 px-8">
            <div className="flex items-center gap-4">
              <div className="h-20 w-20 rounded-full bg-[#059669] text-white flex items-center justify-center text-3xl font-bold shadow-lg shadow-emerald-900/20">
                {userProfile?.name?.charAt(0).toUpperCase() || "U"}
              </div>
              <div>
                <CardTitle className="text-2xl text-slate-800 dark:text-slate-200">{userProfile?.name}</CardTitle>
                <CardDescription className="text-base text-slate-500 dark:text-slate-400 dark:text-slate-500 mt-1 flex items-center gap-1">
                  <Mail className="h-4 w-4" /> {userProfile?.email}
                </CardDescription>
                <div className="flex items-center gap-1 mt-2">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">
                    <ShieldCheck className="h-3 w-3" /> Akun Aktif
                  </span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSave} className="space-y-6">
              {showSuccess && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="p-4 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-100 dark:border-emerald-900 rounded-xl flex items-center gap-2 text-emerald-700 font-medium">
                  <CheckCircle2 className="h-5 w-5" />
                  Profil berhasil diperbarui.
                </motion.div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                    <User className="h-4 w-4 text-[#059669]" /> Nama Lengkap
                  </label>
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 rounded-xl py-6 px-4 text-base"
                  />
                </div>
                
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                    <Phone className="h-4 w-4 text-[#059669]" /> Nomor Handphone
                  </label>
                  <Input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Contoh: 081234567890"
                    className="bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 rounded-xl py-6 px-4 text-base"
                  />
                </div>
                
                <div className="space-y-3 md:col-span-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                    <Mail className="h-4 w-4 text-slate-400 dark:text-slate-500" /> Email (Tidak dapat diubah)
                  </label>
                  <Input
                    type="email"
                    value={userProfile?.email || ""}
                    disabled
                    className="bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl py-6 px-4 text-base text-slate-500 dark:text-slate-400 dark:text-slate-500 cursor-not-allowed"
                  />
                </div>
              </div>
              
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                <Button 
                  type="submit" 
                  disabled={isSaving}
                  className="bg-[#059669] hover:bg-[#047857] text-white py-6 px-8 rounded-xl font-semibold shadow-lg shadow-emerald-900/20 transition-all"
                >
                  {isSaving ? "Menyimpan..." : "Simpan Perubahan"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
