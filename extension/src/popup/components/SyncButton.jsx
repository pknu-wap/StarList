import React from 'react';
import axios from 'axios';

import useAuthStore from '../store/useAuthStore'
import useNavigation from '../hooks/useNavigation';


// const API_BASE_URL = process.env.REACT_APP_API_URL; 

/* global chrome */
function SyncButton() {
    const jwt = useAuthStore((state) => state.jwt);
    const { goToSyncLoadingPage } = useNavigation();

    const getBookmarkTree = () => {
        return new Promise((resolve, reject) => {
            chrome.bookmarks.getTree((bookmarkTree) => {
            if (chrome.runtime.lastError)
                reject(chrome.runtime.lastError);
            else
                resolve(bookmarkTree);
            });
        });
    };

    const handleSync = async () => {
        if (!jwt) {
            alert("jwt 토큰이 없습니다. 로그인을 해주세요.");
            return;
        }
        
        try {
            const bookmarkTree = await getBookmarkTree();   // 북마크 트리 가져오기
            const response = await axios.post(              // axios를 사용해 백엔드에 POST 요청으로 북마크 전송
                'http://starlist.com/api/bookmarks/sync',   // 전역변수 쓸 때에는 마지막에 '/' 여부를 확인할 것!
                { 
                    data: 
                    { 
                        bookmarks: bookmarkTree 
                    } 
                },
                {
                    headers: 
                    {
                    'Content-Type': 'json',
                    'Authorization': `${jwt}`
                    }
                }
            );
            console.log('동기화 전송 완료:', response.data);
            goToSyncLoadingPage();
        } 

        catch (error) {
            console.error('동기화 전송 에러:', error);
        }
    };

    return (
        <div>
            <button onClick={handleSync}>동기화</button>
        </div>
    );
}

export default SyncButton;