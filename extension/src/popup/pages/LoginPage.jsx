import React, { useEffect } from 'react';
import useNavigation from '../hooks/useNavigation';

import Logo from '../components/Logo';
import Text from '../components/Text';
import LoginButton from '../components/LoginButton';

/* global chrome */

/*
chrome.runtime.sendMessage 와 sendResponse 는 JS 의 return 으로 흐름이 연결되는 것이 아니라,
크롬 런타임(브라우저)에 내장된 IPC(프로세스 간 통신) 매커니즘을 통해 동작한다.

팝업이나 React 컴포넌트와 서비스 워커는 별도 컨텍스트(스레드/프로세스)로 실행되기 때문에,
이 둘을 이어 주는 다리가 바로 메시지 채널인 것이다.
*/

/* 
    chrome.runtime.sendMessage(
        extensionId?: string,      # 생략시, message 가 자체 확장프로그램/앱 으로 전송됨
        message: any,              # 이 값은 JSON으로 변환 가능한 객체 이여야 함
        options?: object,
        callback?: function,       # callback 매개변수 : (response: any) => void
    ) 
*/

/*
<로그인 흐름도>
1. LoginButton Click
2. service worker 에서 로그인 웹페이지로 redirect
3. 웹 서버에서 jwt 토큰, hasSynced 를 백엔드 서버로부터 받음
4. 이를 웹 페이지에서 service worker 로 message 전송
5. service worker 는 이 메시지를 수신하여 유효성 판단 후 storage 에 jwt 토큰과 hasSynced 를 저장
6. LoginPage 에서 이를 감지하여 hasSynced 에 따라 Page 를 라우팅
*/

function LoginPage() {
    const { goToMainPage, goToSyncStartPage } = useNavigation();

    // 팝업이 열릴 때마다 token 유무 검사
    useEffect(() => {
        chrome.storage.local.get(['userToken', 'hasSynced'], ({ userToken, hasSynced }) => {
            if (userToken) {
                hasSynced ? goToMainPage() : goToSyncStartPage();
            }
        });
    }, [goToMainPage, goToSyncStartPage]);

    const handleLogin = () => {
        chrome.runtime.sendMessage({ type: 'LOGIN_BUTTON_CLICKED' }, (response) => {
          if (!response.success) 
            console.log('Redirect 실패: ', response.error);
          else
            console.log('Redirect 성공');
        });
    };

    return (
        <div className='w-full h-full flex flex-col justify-center'>
            <div className='p-5 flex flex-col justify-center items-center'>
                <Logo className='pb-3' width='250px' height='250px'/>
                <Text style='default' content='지금 로그인하고'/> 
                <Text style='default' content='내 북마크에 새로운 빛을 더해보세요'/>
                <LoginButton onClick={handleLogin}/>
            </div>
        </div>
    );
}

export default LoginPage;