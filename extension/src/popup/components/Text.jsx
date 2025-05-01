import React from 'react';

// 미리 정의된 tailwind 스타일
const STYLE_MAP = {
    default: "text-base text-center",
    title: "text-lg text-center font-bold",
};
  
function Text({ style, content }) {
    const baseClass = STYLE_MAP[style] || STYLE_MAP.default;  // variant 값이 없을경우 default 사용
    return (
        <p className={baseClass}>
        {content}
        </p>
    );
}

export default Text;