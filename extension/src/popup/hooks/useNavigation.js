import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const useNavigation = () => {
  const navigate = useNavigate();

  // 특정 페이지로 이동하는 함수를 정의합니다.
  const goToLoginPage = useCallback(() => {
    navigate('../pages/LoginPage');
  }, [navigate]);

  const goToSyncStartPage = useCallback(() => {
    navigate('../pages/SyncStart')
  }, [navigate]);

  const goToSyncLoadingPage = useCallback(() => {
    navigate('../pages/SyncLoading')
  }, [navigate]);

  const goToMainPage = useCallback(() => {
    navigate('../pages/MainPage');
  }, [navigate]);
  
  return {
    goToLoginPage,
    goToSyncStartPage,
    goToSyncLoadingPage,
    goToMainPage
  };
};

export default useNavigation;
