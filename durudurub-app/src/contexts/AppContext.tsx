import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  isAdmin?: boolean;
  isPremium?: boolean;
}

interface AppContextType {
  user: User | null;
  accessToken: string | null;
  profileImage: string | null;
  setUser: (user: User | null) => void;
  setAccessToken: (token: string | null) => void;
  setProfileImage: (image: string | null) => void;
  handleLogin: (userData: User, token: string) => void;
  handleLogout: () => void;
  handleProfileImageUpdate: (newImage: string | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  // 컴포넌트 마운트 시 로컬 스토리지에서 로그인 정보 확인
  useEffect(() => {
    const storedToken = localStorage.getItem('accessToken');
    const storedUser = localStorage.getItem('user');
    const storedProfileImage = localStorage.getItem('profileImage');

    if (storedToken && storedUser) {
      const tokenParts = storedToken.split('.');
      if (tokenParts.length === 3) {
        // JWT 만료 여부 체크
        try {
          const payload = JSON.parse(atob(tokenParts[1]));
          const now = Math.floor(Date.now() / 1000);
          if (payload.exp && payload.exp < now) {
            // 토큰 만료 - 클리어
            console.log('토큰 만료 - localStorage 클리어');
            localStorage.removeItem('accessToken');
            localStorage.removeItem('user');
            localStorage.removeItem('profileImage');
            return;
          }
        } catch {
          // payload 파싱 실패 시 토큰 제거
          localStorage.removeItem('accessToken');
          localStorage.removeItem('user');
          localStorage.removeItem('profileImage');
          return;
        }

        setAccessToken(storedToken);
        setUser(JSON.parse(storedUser));
        if (storedProfileImage) {
          setProfileImage(storedProfileImage);
        }
        console.log('저장된 로그인 정보 복원 성공');
      } else {
        console.log('잘못된 토큰 형식 감지 - localStorage 클리어');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        localStorage.removeItem('profileImage');
      }
    }
  }, []);

  const handleLogin = (userData: User, token: string) => {
    console.log('[AppContext] handleLogin 호출됨:', { userData, token: token?.substring(0, 20) + '...' });
    setUser(userData);
    setAccessToken(token);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('accessToken', token);
    console.log('[AppContext] user 상태 설정 완료');
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    localStorage.removeItem('profileImage');
    setUser(null);
    setAccessToken(null);
    setProfileImage(null);
  };

  const handleProfileImageUpdate = (newImage: string | null) => {
    setProfileImage(newImage);
    if (newImage) {
      localStorage.setItem('profileImage', newImage);
    } else {
      localStorage.removeItem('profileImage');
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        accessToken,
        profileImage,
        setUser,
        setAccessToken,
        setProfileImage,
        handleLogin,
        handleLogout,
        handleProfileImageUpdate,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
