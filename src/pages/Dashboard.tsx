import React, { useMemo } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useData } from "../contexts/DataContext";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  Activity,
  ArrowRightLeft,
  CreditCard,
  PiggyBank,
  Eye,
  EyeOff
} from "lucide-react";
import { formatCurrency } from "../lib/utils";
import { motion } from "motion/react";

export function Dashboard() {
  const { currentUser } = useAuth();
  const { accounts, transactions } = useData();

  const totalBalance = useMemo(() => {
    return accounts.reduce((sum, acc) => sum + acc.balance, 0);
  }, [accounts]);

  const { income, expense } = useMemo(() => {
    let income = 0;
    let expense = 0;

    transactions.forEach((tx) => {
      if (tx.type === "income") income += tx.amount;
      if (tx.type === "expense") expense += tx.amount;
    });
    return { income, expense };
  }, [transactions]);

  const recentTransactions = useMemo(() => {
    return [...transactions]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);
  }, [transactions]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Dashboard
        </h1>
        <p className="text-sm text-emerald-100">
          Ringkasan keuangan Anda saat ini.
        </p>
      </motion.div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <motion.div variants={itemVariants}>
          <Card className="rounded-[2rem] border-0 shadow-lg overflow-hidden bg-white dark:bg-slate-900 hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-6 px-6">
              <CardTitle className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Total Dana</CardTitle>
              <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-full flex items-center justify-center">
                <Wallet className="h-5 w-5 text-indigo-500" />
              </div>
            </CardHeader>
            <CardContent className="pb-6 px-6">
              <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-slate-100 tracking-tight mt-1">
                {formatCurrency(totalBalance)}
              </div>
              <p className="text-xs font-bold text-slate-400 dark:text-slate-500 mt-3">Dari {accounts.length} akun aktif</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="rounded-[2rem] border-0 shadow-lg overflow-hidden bg-white dark:bg-slate-900 hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-6 px-6">
              <CardTitle className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Pemasukan</CardTitle>
              <div className="p-3 bg-[#059669]/10 dark:bg-[#059669]/20 rounded-full flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-[#059669]" />
              </div>
            </CardHeader>
            <CardContent className="pb-6 px-6">
              <div className="text-3xl sm:text-4xl font-black text-[#059669] tracking-tight mt-1">
                {formatCurrency(income)}
              </div>
              <p className="text-xs font-bold text-slate-400 dark:text-slate-500 mt-3">Total akumulasi</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="rounded-[2rem] border-0 shadow-lg overflow-hidden bg-white dark:bg-slate-900 hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-6 px-6">
              <CardTitle className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Pengeluaran</CardTitle>
              <div className="p-3 bg-rose-100 dark:bg-rose-900/20 rounded-full flex items-center justify-center">
                <TrendingDown className="h-5 w-5 text-rose-600" />
              </div>
            </CardHeader>
            <CardContent className="pb-6 px-6">
              <div className="text-3xl sm:text-4xl font-black text-rose-600 tracking-tight mt-1">
                {hideBalances ? maskedValue : formatCurrency(expense)}
              </div>
              <p className="text-xs font-bold text-slate-400 dark:text-slate-500 mt-3">Total akumulasi</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="rounded-[2rem] border-0 shadow-lg overflow-hidden bg-gradient-to-br from-[#059669] to-emerald-800 text-white hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-6 px-6">
              <CardTitle className="text-xs font-bold text-emerald-100 uppercase tracking-widest">Cashflow</CardTitle>
              <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm flex items-center justify-center">
                <Activity className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent className="pb-6 px-6">
              <div className="text-3xl sm:text-4xl font-black tracking-tight mt-1">
                {hideBalances ? maskedValue : formatCurrency(income - expense)}
              </div>
              <p className="text-xs font-bold text-emerald-200 mt-3">Selisih masuk & keluar</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div variants={itemVariants}>
          <Card className="rounded-[2rem] border-0 shadow-xl bg-white dark:bg-slate-900 col-span-1 overflow-hidden">
            <CardHeader className="border-b border-slate-50 bg-slate-50 dark:bg-slate-800/50/50 pb-4">
              <CardTitle className="text-lg text-slate-800 dark:text-slate-200">Transaksi Terakhir</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              {recentTransactions.length > 0 ? (
                <div className="space-y-5">
                  {recentTransactions.map((tx) => (
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      key={tx.id}
                      className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 dark:bg-slate-800/50 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div
                          className={`flex h-12 w-12 items-center justify-center rounded-2xl shadow-sm ${
                            tx.type === "income"
                              ? "bg-emerald-100 text-emerald-600"
                              : tx.type === "expense"
                                ? "bg-rose-100 text-rose-600"
                                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 dark:text-slate-500"
                          }`}
                        >
                          {tx.type === "income" ? (
                            <TrendingUp className="h-6 w-6" />
                          ) : tx.type === "expense" ? (
                            <TrendingDown className="h-6 w-6" />
                          ) : (
                            <ArrowRightLeft className="h-6 w-6" />
                          )}
                        </div>
                        <div>
                          <p className="text-base font-bold text-slate-800 dark:text-slate-200">
                            {tx.description}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 dark:text-slate-500">{tx.category}</span>
                            <span className="text-xs text-slate-400 dark:text-slate-500">
                              {new Date(tx.date).toLocaleDateString("id-ID", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div
                        className={`text-base font-black ${
                          tx.type === "income"
                            ? "text-emerald-600"
                            : tx.type === "expense"
                              ? "text-rose-600"
                              : "text-slate-900 dark:text-slate-100"
                        }`}
                      >
                        {tx.type === "expense"
                          ? "-"
                          : tx.type === "income"
                            ? "+"
                            : ""}
                        {formatCurrency(tx.amount)}
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800/50 rounded-full flex items-center justify-center mb-4">
                    <PiggyBank className="w-8 h-8 text-slate-300" />
                  </div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400 dark:text-slate-500">Belum ada transaksi bulan ini</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Card className="rounded-[2rem] border-0 shadow-xl bg-white dark:bg-slate-900 col-span-1 overflow-hidden h-full">
            <CardHeader className="border-b border-slate-50 bg-slate-50 dark:bg-slate-800/50/50 pb-4">
              <CardTitle className="text-lg text-slate-800 dark:text-slate-200">Akun & Dompet</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {accounts.map((acc) => (
                   <motion.div
                   whileHover={{ scale: 1.02 }}
                   key={acc.id}
                   className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-teal-100 hover:shadow-md transition-all"
                 >
                   <div className="flex items-center space-x-4">
                     <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 dark:bg-teal-950/50 text-teal-600">
                       <CreditCard className="h-6 w-6" />
                     </div>
                     <div>
                       <p className="text-base font-bold text-slate-800 dark:text-slate-200">
                         {acc.name}
                       </p>
                       <p className="text-xs font-medium text-slate-400 dark:text-slate-500 capitalize mt-0.5">
                         {acc.type}
                       </p>
                     </div>
                   </div>
                   <div className="text-base font-black text-slate-800 dark:text-slate-200">
                     {formatCurrency(acc.balance)}
                   </div>
                 </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
