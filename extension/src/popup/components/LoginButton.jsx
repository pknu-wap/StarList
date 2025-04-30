import React from 'react';

// 미리 정의된 tailwind 스타일
const STYLE_MAP = {
    default: "w-[449px] h-[152px] rounded-[40px] bg-[#57418b] text-white",
    loading: "w-[449px] h-[152px] rounded-[40px] bg-[#ddd9e7] text-black cursor-not-allowed"
};

function LoginButton({ onClick }) {
    return (
        <button 
            className={STYLE_MAP.default}
            onClick={onClick}
        >
            로그인
        </button>
    );
}

export default LoginButton;