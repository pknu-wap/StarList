import React from 'react';
import { useNavigate } from 'react-router-dom';

const useNavigation = () => {
  const navigate = useNavigate();

  // 특정 페이지로 이동하는 함수를 정의합니다.
  const goToLoginPage = () => {
    navigate('../pages/LoginPage');
  };

  const goToSyncStartPage = () => {
    navigate('../pages/SyncStart')
  }

  const goToSyncLoadingPage = () => {
    navigate('../pages/SyncLoading')
  }

  const goToMainPage = () => {
    navigate('../pages/MainPage');
  };
  
  return {
    goToLoginPage,
    goToSyncStartPage,
    goToSyncLoadingPage,
    goToMainPage
  };
};

export default useNavigation;
