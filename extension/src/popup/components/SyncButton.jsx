import React from 'react';

// 미리 정의된 tailwind 스타일
const STYLE_MAP = {
    default: "font-bold  text-lg  w-96 h-16 bg-[#57418B] text-white justify-center",
};

function SyncButton({ onClick }) {
    return (
        <button 
            className={STYLE_MAP.default}
            onClick={onClick}
        >
            동기화
        </button>
    );
};

export default SyncButton;