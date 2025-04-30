import React from 'react';
import useNavigation from '../hooks/useNavigation';

import Header from '../components/Header';
import Logo from '../components/Logo';
import Text from '../components/Text';
import SyncButton from '../components/SyncButton';

/* global chrome */

function SyncStartPage() {
    const { goToSyncStatusPage } = useNavigation();

    const handleSyncStart = () => {
        chrome.runtime.sendMessage({ type: 'SYNC_START_BUTTON_CLICKED' });
        goToSyncStatusPage();
    };

    return (
        <div>
            <Header/>
            <Logo width='100px' height='100px'/>
            <Text style='default' content='안녕하세요! 클릭 한 번으로 북마크가 새롭게 정리됩니다'/>
            <SyncButton onClick={handleSyncStart}/>
        </div>
    );
}   

export default SyncStartPage;