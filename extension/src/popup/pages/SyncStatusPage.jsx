import React, { useState, useEffect } from 'react';
import useNavigation from '../hooks/useNavigation';

import Header from '../components/Header';
import Logo from '../components/Logo';
import Text from '../components/Text';

/* global chrome */

function SyncStatusPage() {
    const [status, setStatus] = useState("LOADING");
    const [error, setError] = useState(null);

    const { goToMainPage, goToSyncStartPage } = useNavigation();

    useEffect(() => {
        // 1. 초기 응답 상태 가져오기
        chrome.storage.local.get(["syncStatus", "syncError"], ({syncStatus, syncError}) => {
            if (syncStatus) setStatus(syncStatus);
            if (syncError)  setError(syncError);
        })

        // 2. chrome.storage.local 에서 syncStatus, syncError 값을 추적
        const listener = (changes, area) => {
            if (area == 'local') {
                if (changes.syncStatus) {
                    setStatus(changes.syncStatus.newValue);
                }
                if (changes.syncError) {
                    setError(changes.syncError.newValue);
                }
            }
        };
        chrome.storage.onChanged.addListener(listener);

        // clean-up
        return () => {
            chrome.storage.onChanged.removeListener(listener);
        };
    }, []);

    // 3. status가 바뀐 뒤에 3초 뒤에 내비게이션 실행
    useEffect(() => {
        let timerId;

        if (status === 'SUCCESS') {
            timerId = setTimeout(() => {
                goToMainPage();
            }, 3000);
        }

        else if (status === 'FAIL') {
            timerId = setTimeout(() => {
                goToSyncStartPage();
            }, 3000);
        }

        return () => {
            if (timerId) clearTimeout(timerId);
        };
    }, [status, goToMainPage, goToSyncStartPage]);

    return (
        <div>
            <Header/>
            {status == 'LOADING' && (
                <div>
                    <Logo width='100px' height='100px'/>
                    <Text style='default' content='동기화 중입니다'/>
                    <Text style='default' content='거의 다 완료됐어요...'/>
                </div>
            )}
            {status == 'SUCCESS' && (
                <div>
                    <Logo width='100px' height='100px'/>
                    <Text style='default' content='동기화 성공!'/>
                    <Text style='default' content='메인 화면으로 이동할게요'/>
                </div>
            )}
            {status == 'FAIL' && (
                <div>
                    {console.log(error)} {/* 디버깅용 */}
                    <Logo width='100px' height='100px'/>
                    <Text style='default' content='동기화 실패...'/>
                    <Text style='default' content='이전 화면으로 돌아갈게요'/>
                </div>
            )}
        </div>
    );
}

export default SyncStatusPage;