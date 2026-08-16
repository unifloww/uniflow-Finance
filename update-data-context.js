const fs = require('fs');

let content = fs.readFileSync('src/contexts/DataContext.tsx', 'utf8');

// Add syncStatus to DataContextType
content = content.replace(
  'isLoaded: boolean;',
  `isLoaded: boolean;
  syncStatus: 'synced' | 'syncing' | 'offline';`
);

// Add syncStatus state and update logic to DataProvider
content = content.replace(
  'const [isLoaded, setIsLoaded] = useState(false);',
  `const [isLoaded, setIsLoaded] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'synced' | 'syncing' | 'offline'>(navigator.onLine ? 'synced' : 'offline');

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
  };`
);

// Call triggerSync on save
const saveEffectAccounts = `useEffect(() => {
    if (!currentUser || !isLoaded) return;
    localStorage.setItem(\`uniflow_accounts_\${currentUser.uid}\`, JSON.stringify(accounts));
    triggerSync();
  }, [accounts, currentUser, isLoaded]);`;
  
const saveEffectTransactions = `useEffect(() => {
    if (!currentUser || !isLoaded) return;
    localStorage.setItem(\`uniflow_transactions_\${currentUser.uid}\`, JSON.stringify(transactions));
    triggerSync();
  }, [transactions, currentUser, isLoaded]);`;
  
const saveEffectGoals = `useEffect(() => {
    if (!currentUser || !isLoaded) return;
    localStorage.setItem(\`uniflow_goals_\${currentUser.uid}\`, JSON.stringify(goals));
    triggerSync();
  }, [goals, currentUser, isLoaded]);`;

content = content.replace(
  /useEffect\(\(\) => \{\s+if \(\!currentUser \|\| \!isLoaded\) return;\s+localStorage\.setItem\(`uniflow_accounts_\$\{currentUser\.uid\}`\, JSON\.stringify\(accounts\)\);\s+\}\, \[accounts, currentUser, isLoaded\]\);/g,
  saveEffectAccounts
);

content = content.replace(
  /useEffect\(\(\) => \{\s+if \(\!currentUser \|\| \!isLoaded\) return;\s+localStorage\.setItem\(`uniflow_transactions_\$\{currentUser\.uid\}`\, JSON\.stringify\(transactions\)\);\s+\}\, \[transactions, currentUser, isLoaded\]\);/g,
  saveEffectTransactions
);

content = content.replace(
  /useEffect\(\(\) => \{\s+if \(\!currentUser \|\| \!isLoaded\) return;\s+localStorage\.setItem\(`uniflow_goals_\$\{currentUser\.uid\}`\, JSON\.stringify\(goals\)\);\s+\}\, \[goals, currentUser, isLoaded\]\);/g,
  saveEffectGoals
);

content = content.replace(
  'deleteGoal,      isLoaded',
  `deleteGoal,      isLoaded, syncStatus`
);

fs.writeFileSync('src/contexts/DataContext.tsx', content);
