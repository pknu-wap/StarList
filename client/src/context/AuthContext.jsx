import React, { createContext, useContext, useState, useEffect } from "react";
import useAuthStore from "../functions/hooks/useAuthStore";

// 로그인, 로그아웃 관련 Context 생성
const AuthContext = createContext();

// 해당 Context 를 제공하는 컴포넌트
const AuthProvider = ({ children }) => {
    const { accessToken, login, logout } = useAuthStore();
    const [isLoggedIn, setIsLoggedIn] = useState(!!accessToken);

    // Zustand store의 token 변화에 따라 isLoggedIn 상태 동기화
    useEffect(() => {
        setIsLoggedIn(!!accessToken);
    }, [accessToken]);

    return (
        <AuthContext.Provider value={{ isLoggedIn, accessToken, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Context 사용을 위한 Hook
const useAuth = () => {
  const context = useContext(AuthContext);

  // 만약 Context Provider 바깥에서 이 Hook 을 호출하면 에러를 반환
  if (!context)
    throw new Error("useAuth 는 AuthProvider 영역 안에서만 호출하여야 합니다");

  return context;
};

export { AuthProvider, useAuth };