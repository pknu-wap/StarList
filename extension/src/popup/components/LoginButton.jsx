import React from 'react';

function LoginButton({ onClick }) {
    return (
        <button
            className='w-[100px] h-[40px] rounded-[10px] bg-[#57418b] text-base text-white text-center font-bold m-3'
            onClick={onClick}
        >
            로그인
        </button>
    );
}

export default LoginButton;