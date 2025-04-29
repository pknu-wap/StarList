import React from 'react';

function LogoutButton() {
    const handleLogout = () => {
        console.log('Button clicked!');
    };

    return (
        <div>
            <button onClick={handleLogout}>로그아웃</button>
        </div>
    );
}

export default LogoutButton;