sed -i 's/Halo, {firstName} 👋/{greeting}, {firstName} 👋/g' src/pages/Dashboard.tsx
sed -i 's/            "{randomQuote}"/            "{randomQuote}"<br \/>\n            <span className="font-semibold text-white\/90 inline-block mt-2 px-3 py-1 bg-white\/10 rounded-full text-xs">🕒 {currentTimeStr} \u2014 Jangan lupa catat keuanganmu hari ini!<\/span>/g' src/pages/Dashboard.tsx
