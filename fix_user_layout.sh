sed -i 's/<div className="flex h-16 items-center px-6 border-b border-\[#10b981\]">/<div className="flex h-24 items-center justify-center px-6 border-b border-\[#10b981\]">/g' src/components/UserLayout.tsx
sed -i 's/className="h-12 w-auto mr-2 object-contain drop-shadow-lg"/className="h-16 sm:h-20 w-auto object-contain drop-shadow-xl hover:scale-105 transition-transform cursor-pointer"/g' src/components/UserLayout.tsx
sed -i 's/<div className="flex h-\[calc(100vh-4rem)\] flex-col justify-between p-4">/<div className="flex h-\[calc(100vh-6rem)\] flex-col justify-between p-4">/g' src/components/UserLayout.tsx

sed -i 's/<header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-\[#10b981\] bg-\[#059669\] px-4 lg:hidden">/<header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-\[#10b981\] bg-\[#059669\] px-4 lg:hidden">/g' src/components/UserLayout.tsx
sed -i 's/className="h-8 w-auto object-contain drop-shadow-md"/className="h-12 w-auto object-contain drop-shadow-md"/g' src/components/UserLayout.tsx
