sed -i 's/          <h1 className="text-2xl font-bold tracking-tight text-white">/          <h1 className="text-3xl font-bold tracking-tight text-white">/g' src/pages/Dashboard.tsx
sed -i 's/            Dashboard/            Halo, {firstName} 👋/g' src/pages/Dashboard.tsx
sed -i 's/          <p className="text-sm text-emerald-100">/          <p className="text-sm text-emerald-100 max-w-xl mt-1 opacity-90">/g' src/pages/Dashboard.tsx
sed -i 's/            Ringkasan keuangan Anda saat ini./            "{randomQuote}"/g' src/pages/Dashboard.tsx
