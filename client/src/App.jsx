import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import useAuthStore from "./functions/hooks/useAuthStore"; // 로그인 상태가 저장되어 있는 훅스

import MainPage from "./pages/MainPage";
import StartPage from "./pages/StartPage";
import NotFoundPage from "./pages/NotFoundPage";
import AuthSuccessPage from "./pages/AuthSuccessPage";
import PrivatePolicyPage from "./pages/PrivatePolicyPage";
import SettingPage from "./pages/SettingPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const App = () => {
  const { isLoggedIn } = useAuthStore(); // Zustand 스토어에서 로그인 상태 가져오기
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        {/* 로그인 여부에 따라 시작 페이지를 다르게 설정 */}
        <Route
          path="/"
          element={
            isLoggedIn
              ? <Navigate to="/main" replace />
              : <Navigate to="/start" replace />
          }
        />
        {/*익스텐션 개인정보처리방침 페이지 */}
        <Route path="/policy" element={<PrivatePolicyPage />} />
        {/* 로그인 완료 후 처리 페이지 */}
        <Route path="/auth/success" element={<AuthSuccessPage />} />

        {/* 메인 페이지 */}
        <Route path="/main" element={<MainPage />} />

        {/* 시작(로그인) 페이지 */}
        <Route path="/start" element={<StartPage />} />
        {/* 설정 페이지 */}
        <Route path="/setting" element={<SettingPage />} />
        {/* 그 외 404 페이지 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </QueryClientProvider>
  );
};

export default App;
