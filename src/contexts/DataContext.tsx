import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

export interface Account {
  id: string;
  name: string;
  type: 'bank' | 'wallet' | 'cash';
  provider?: string;
  balance: number;
}

export interface Transaction {
  id: string;
  accountId: string;
  type: 'income' | 'expense' | 'transfer';
  amount: number;
  category: string;
  description: string;
  date: string;
}

export interface Goal {
  id: string;
  name: string;
  target: number;
  current: number;
  deadline: string;
}

interface DataContextType {
  accounts: Account[];
  transactions: Transaction[];
  goals: Goal[];
  addAccount: (account: Omit<Account, 'id'>) => void;
  editAccount: (id: string, data: Partial<Account>) => void;
  deleteAccount: (id: string) => void;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;
  addGoal: (goal: Omit<Goal, 'id'>) => void;
  editGoal: (id: string, goal: Partial<Goal>) => void;
  deleteGoal: (id: string) => void;
  isLoaded: boolean;
  syncStatus: 'synced' | 'syncing' | 'offline';
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const initialAccounts: Account[] = [
  { id: '1', name: 'BCA Utama', type: 'bank', provider: 'bca', balance: 15000000 },
  { id: '2', name: 'GoPay', type: 'wallet', provider: 'gopay', balance: 500000 },
];

const initialTransactions: Transaction[] = [
  { id: '1', accountId: '1', type: 'income', amount: 10000000, category: 'Gaji', description: 'Gaji Bulanan', date: new Date().toISOString() },
  { id: '2', accountId: '2', type: 'expense', amount: 150000, category: 'Makanan', description: 'Makan siang', date: new Date().toISOString() },
];

const initialGoals: Goal[] = [
  { id: '1', name: 'Liburan Jepang', target: 20000000, current: 5000000, deadline: '2027-12-31' },
];

export function DataProvider({ children }: { children: React.ReactNode }) {
  const { currentUser } = useAuth();
  
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'synced' | 'syncing' | 'offline'>(
    navigator.onLine ? 'synced' : 'offline'
  );

  useEffect(() => {
    const handleOnline = () => {
      setSyncStatus('syncing');
      setTimeout(() => setSyncStatus('synced'), 800);
    };
    const handleOffline = () => setSyncStatus('offline');

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const triggerSync = () => {
    if (!navigator.onLine) return;
    setSyncStatus('syncing');
    setTimeout(() => setSyncStatus('synced'), 600); // Simulate network latency
  };

  // Load from local storage
  useEffect(() => {
    if (!currentUser) return;
    
    setIsLoaded(false);
    const accountsData = localStorage.getItem(`uniflow_accounts_${currentUser.uid}`);
    const transactionsData = localStorage.getItem(`uniflow_transactions_${currentUser.uid}`);
    const goalsData = localStorage.getItem(`uniflow_goals_${currentUser.uid}`);

    if (accountsData) setAccounts(JSON.parse(accountsData));
    else setAccounts(initialAccounts);

    if (transactionsData) setTransactions(JSON.parse(transactionsData));
    else setTransactions(initialTransactions);

    if (goalsData) setGoals(JSON.parse(goalsData));
    else setGoals(initialGoals);
    
    setIsLoaded(true);
  }, [currentUser]);

  // Save to local storage when state changes
  useEffect(() => {
    if (!currentUser || !isLoaded) return;
    localStorage.setItem(`uniflow_accounts_${currentUser.uid}`, JSON.stringify(accounts));
    triggerSync();
  }, [accounts, currentUser, isLoaded]);

  useEffect(() => {
    if (!currentUser || !isLoaded) return;
    localStorage.setItem(`uniflow_transactions_${currentUser.uid}`, JSON.stringify(transactions));
    triggerSync();
  }, [transactions, currentUser, isLoaded]);

  useEffect(() => {
    if (!currentUser || !isLoaded) return;
    localStorage.setItem(`uniflow_goals_${currentUser.uid}`, JSON.stringify(goals));
    triggerSync();
  }, [goals, currentUser, isLoaded]);

  const addAccount = (account: Omit<Account, 'id'>) => {
    setAccounts([...accounts, { ...account, id: crypto.randomUUID() }]);
  };

  const editAccount = (id: string, updatedData: Partial<Account>) => {
    setAccounts(accounts.map(acc => acc.id === id ? { ...acc, ...updatedData } : acc));
  };

  const deleteAccount = (id: string) => {
    setAccounts(accounts.filter(acc => acc.id !== id));
  };

  const addTransaction = (tx: Omit<Transaction, 'id'>) => {
    setTransactions([ { ...tx, id: crypto.randomUUID() }, ...transactions]);
    
    // Update account balance
    setAccounts(accounts.map(acc => {
      if (acc.id === tx.accountId) {
        if (tx.type === 'income') return { ...acc, balance: acc.balance + tx.amount };
        if (tx.type === 'expense') return { ...acc, balance: acc.balance - tx.amount };
      }
      return acc;
    }));
  };

  const deleteTransaction = (id: string) => {
    const tx = transactions.find(t => t.id === id);
    if (!tx) return;
    
    // Revert account balance
    setAccounts(accounts.map(acc => {
      if (acc.id === tx.accountId) {
        if (tx.type === 'income') return { ...acc, balance: acc.balance - tx.amount };
        if (tx.type === 'expense') return { ...acc, balance: acc.balance + tx.amount };
      }
      return acc;
    }));
    
    setTransactions(transactions.filter(t => t.id !== id));
  }

  const addGoal = (goal: Omit<Goal, 'id'>) => {
    setGoals([...goals, { ...goal, id: crypto.randomUUID() }]);
  };

  const editGoal = (id: string, updatedData: Partial<Goal>) => {
    setGoals(goals.map(g => g.id === id ? { ...g, ...updatedData } : g));
  };

  const deleteGoal = (id: string) => {
    setGoals(goals.filter(g => g.id !== id));
  };

  return (
    <DataContext.Provider value={{ 
      accounts, 
      transactions, 
      goals, 
      addAccount, 
      editAccount,
      deleteAccount,
      addTransaction, 
      deleteTransaction, 
      addGoal, 
      editGoal, 
      deleteGoal,
      isLoaded,
      syncStatus
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
