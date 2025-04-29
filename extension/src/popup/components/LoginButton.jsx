import React from 'react';

function LoginButton() {
    const handleLogin = () => {
        window.open('https://example.com', '_parent'); // 새 창으로 열기
    };

    return (
        <div>
            <button onClick={handleLogin}>로그인</button>
        </div>
    );
}

export default LoginButton;