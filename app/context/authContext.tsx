// context/AuthContext.tsx
"use client";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type User = { id: string; name?: string; email?: string; createdAt?: string } | null;
// types.ts (or wherever you keep types)

type QrCode = {
  id: string;
  url: string;
  userId: string;
  image: string;
  createdAt: string;
};

type Url = {
  id: string;
  url: string;
  userId: string;
  createdAt: string;
  // add whatever other fields a URL has
};

type Analytics = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  qr: QrCode[];
  url: Url[];
};

type AuthContextType = {
  user: User;
  loading: boolean;
  login: (user: User) => void;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
  shortenUrl: (url:string) => Promise<void>;
  shortUrl: string;
  userAnalytics: (userId: string) => Promise<Analytics | undefined>;
  analytics: Analytics | undefined
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};


const AuthContext = createContext<AuthContextType | null>(null);


export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);
  const [shortUrl, setShortUrl] = useState<string>("");
  const [analytics, setAnalytics] = useState<Analytics | undefined>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  

  const refresh = async () => {
    try {
      const res = await fetch("/api/me", { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // 🔑 THIS is what restores user state on every full page load
  useEffect(() => {
    refresh();
  }, []);

  const login = (userData: User) => setUser(userData);

  // const logout = async () => {
  //   try {
  //     const response = await axios.get(
  //     `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/logout`,
  //     { withCredentials: true }
  //     );

  //     setUser(null);  
  //     router.push("/");           // client-side nav
  //     router.refresh();   
  //   } catch (error) {
  //     console.log(error, "error login out");
  //   }
  // }

    const logout = async () => {
      try {
        await axios.get(`/api/backend/auth/logout`, { withCredentials: true });
        setUser(null);
        router.push("/");
        router.refresh();
      } catch (error) {
        console.log(error, "error logging out");
      }
    };




// const shortenUrl = async (url: string) => {
//   try {
//     setLoading(true);
//     const response = await axios.post(
//       `${process.env.NEXT_PUBLIC_SERVER_URL}/url/urlShortener`,
//       { url },
//       { withCredentials: true }
//     );
//     const responseUrl = response.data.shortURL;
//     setShortUrl(responseUrl);
//   } catch (err) {
//     console.error("Failed to shorten URL:", err);
//   } finally {
//     setLoading(false);
//   }
//   };


//   const userAnalytics = async (userId: string) => {
//   try {
//     const response = await axios.get(
//       `${process.env.NEXT_PUBLIC_SERVER_URL}/userAnalytics/${userId}`
//     );
//     const analyticsResponse = await response.data?.analytics;
//     setAnalytics(analyticsResponse);
//     return analyticsResponse;
//   } catch (err) {
//     console.error("Failed to fetch Analytics:", err);
//   }
//   };

    const shortenUrl = async (url: string) => {
      try {
        setLoading(true);
        const response = await axios.post(
          `/api/backend/url/urlShortener`,
          { url },
          { withCredentials: true }
        );
        setShortUrl(response.data.shortURL);
      } catch (err) {
        console.error("Failed to shorten URL:", err);
      } finally {
        setLoading(false);
      }
    };

    const userAnalytics = async (userId: string) => {
      try {
        const response = await axios.get(`/api/backend/userAnalytics/${userId}`, {
          withCredentials: true,
        });
        const analyticsResponse = response.data?.analytics;
        setAnalytics(analyticsResponse);
        return analyticsResponse;
      } catch (err) {
        console.error("Failed to fetch Analytics:", err);
      }
    };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, refresh, shortenUrl, shortUrl, userAnalytics, analytics, isOpen, setIsOpen }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
};