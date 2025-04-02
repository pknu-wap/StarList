import React from "react";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import CategoryPage from "./pages/CategoryPage";
import RegisterPage from "./pages/RegisterPage";

const App = () => {
  const isLoggedIn = false; // 로그인 여부를 확인하는 상태

  return (
    <BrowserRouter>
      <Routes>
        {/* 로그인 여부에 따라 시작 페이지를 다르게 설정 */}
        <Route path="/" element={isLoggedIn ? <MainPage /> : <LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/categories" element={<CategoryPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
