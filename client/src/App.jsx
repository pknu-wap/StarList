import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuth, AuthProvider } from "./context/AuthContext";

import MainPage from "./pages/MainPage";
import StartPage from "./pages/StartPage";
import NotFoundPage from "./pages/NotFoundPage";
import AuthSuccessPage from "./pages/AuthSuccessPage";
import PrivatePolicyPage from "./pages/PrivatePolicyPage";
import SettingPage from "./pages/SettingPage";

// React-Query 사용을 위한 QueryClient 객체 선언
const queryClient = new QueryClient();

// 로그아웃 상태일때에는 시작 페이지로 라우팅
const ProtectedRoute = ({ children }) => {
    const { isLoggedIn } = useAuth();
    return isLoggedIn ? children : <Navigate to="/start" replace />;
};

// 로그인 상태일때에는 메인 페이지로 라우팅
const PublicRoute = ({ children }) => {
    const { isLoggedIn } = useAuth();
    return !isLoggedIn ? children : <Navigate to="/main" replace />;
};

const AppRoutes = () => (
  <Routes>
    {/* 루트 페이지 */}
    <Route path="/" element={
      <PublicRoute>
        <StartPage />
      </PublicRoute>
    }/>

    {/* 개인정보처리방침 페이지 */}
    <Route path="/policy" element={<PrivatePolicyPage />} />

    {/* 로그인 완료 후 처리 페이지 */}
    <Route path="/auth/success" element={<AuthSuccessPage />} />

    {/* 메인 페이지 */}
    <Route path="/main" element={
      <ProtectedRoute>
        <MainPage />
      </ProtectedRoute>
    }/>

    {/* 시작 페이지 */}
    <Route path="/start" element={
      <PublicRoute>
        <StartPage />
      </PublicRoute>
    }/>

    {/* 설정 페이지 */}
    <Route path="/setting" element={
      <ProtectedRoute>
        <SettingPage />
      </ProtectedRoute>
    }/>

    {/* 404 페이지 */}
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);


const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;