import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useAuthStore from "./functions/stores/useAuthStore";

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
    const isLoggedIn = useAuthStore((s) => !!s.accessToken);
    return isLoggedIn ? children : <Navigate to="/start" replace />;
};

// 로그인 상태일때에는 메인 페이지로 라우팅
const PublicRoute = ({ children }) => {
    const isLoggedIn = useAuthStore((s) => !!s.accessToken);
    return !isLoggedIn ? children : <Navigate to="/main" replace />;
};

const AppRoutes = () => (
    <Routes>
        <Route
            path="/"
            element={
                <PublicRoute>
                    <StartPage />
                </PublicRoute>
            }
        />

        <Route
            path="/main"
            element={
                <ProtectedRoute>
                    <MainPage />
                </ProtectedRoute>
            }
        />

        <Route
            path="/start"
            element={
                <PublicRoute>
                    <StartPage />
                </PublicRoute>
            }
        />

        <Route
            path="/setting"
            element={
                <ProtectedRoute>
                    <SettingPage />
                </ProtectedRoute>
            }
        />

        <Route path="*" element={<NotFoundPage />} />
        <Route path="/policy" element={<PrivatePolicyPage />} />
        <Route path="/auth/success" element={<AuthSuccessPage />} />
    </Routes>
);

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <AppRoutes />
            </BrowserRouter>
        </QueryClientProvider>
    );
};

export default App;
