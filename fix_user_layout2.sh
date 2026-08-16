sed -i 's/<div className="flex h-24 items-center justify-center px-6 border-b border-\[#10b981\]">/<div className="flex h-32 items-center justify-center px-4 border-b border-\[#10b981\]">/g' src/components/UserLayout.tsx
sed -i 's/className="h-16 sm:h-20 w-auto object-contain drop-shadow-xl hover:scale-105 transition-transform cursor-pointer"/className="h-24 sm:h-28 w-auto object-contain drop-shadow-xl hover:scale-105 transition-transform cursor-pointer"/g' src/components/UserLayout.tsx
sed -i 's/<div className="flex h-\[calc(100vh-6rem)\] flex-col justify-between p-4">/<div className="flex h-\[calc(100vh-8rem)\] flex-col justify-between p-4">/g' src/components/UserLayout.tsx

sed -i 's/<header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-\[#10b981\] bg-\[#059669\] px-4 lg:hidden">/<header className="sticky top-0 z-20 flex h-28 items-center justify-between border-b border-\[#10b981\] bg-\[#059669\] px-4 py-2 lg:hidden">/g' src/components/UserLayout.tsx
sed -i 's/className="h-12 w-auto object-contain drop-shadow-md"/className="h-20 w-auto max-w-[180px] object-contain drop-shadow-md"/g' src/components/UserLayout.tsx
