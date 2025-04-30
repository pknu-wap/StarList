import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import useAuthStore from "./store/useAuthStore"; // 로그인 상태가 저장되어 있는 훅스

import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import CategoryPage from "./pages/CategoryPage";
import RegisterPage from "./pages/RegisterPage";
import StartPage from "./pages/StartPage";
import NotFoundPage from "./pages/NotFoundPage";
import "./index.css";

const App = () => {
  const { isLoggedIn } = useAuthStore(); // Zustand 스토어에서 로그인 상태 가져오기

  return (
    <Routes>
      {/* 로그인 여부에 따라 시작 페이지를 다르게 설정 */}
      <Route path="/" element={isLoggedIn ? <Navigate to="/main" /> : <Navigate to="/start" />} />
      <Route path="/main" element={<MainPage />} />
      <Route path="/start" element={<StartPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      {/* 로그인 여부에 따라 접근 제한 */}
      <Route
        path="/categories"
        element={isLoggedIn ? <CategoryPage /> : <Navigate to="/login" />}
      />
      {/* 404 에러 페이지 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;

