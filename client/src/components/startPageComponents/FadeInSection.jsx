// 시작페이지 페이드인 효과를 주기 위한 컴포넌트
import React, { useEffect, useState } from "react";

const FadeInSection = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 마운트 후 isVisible을 true로 변경 (애니메이션 트리거)
    const timeout = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className={`
        transition-[opacity,transform] duration-1000 ease-out
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
      `}
    >
      {children}
    </div>
  );
};

export default FadeInSection;
