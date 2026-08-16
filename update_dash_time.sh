sed -i 's/import React, { useMemo } from "react";/import React, { useMemo, useState, useEffect } from "react";/g' src/pages/Dashboard.tsx

sed -i '/const { currentUser, userProfile } = useAuth();/a \
  const [greeting, setGreeting] = useState("Halo");\
  const [currentTimeStr, setCurrentTimeStr] = useState("");\
\
  useEffect(() => {\
    const updateTime = () => {\
      const now = new Date();\
      const hours = now.getHours();\
      \
      let newGreeting = "Selamat Malam";\
      if (hours >= 5 \&\& hours < 11) newGreeting = "Selamat Pagi";\
      else if (hours >= 11 \&\& hours < 15) newGreeting = "Selamat Siang";\
      else if (hours >= 15 \&\& hours < 18) newGreeting = "Selamat Sore";\
      \
      setGreeting(newGreeting);\
      setCurrentTimeStr(now.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }));\
    };\
\
    updateTime();\
    const intervalId = setInterval(updateTime, 60000);\
    return () => clearInterval(intervalId);\
  }, []);' src/pages/Dashboard.tsx
