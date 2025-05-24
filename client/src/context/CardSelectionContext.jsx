import React, { createContext, useContext, useState } from "react";

// 카드 선택 Context 생성
const CardSelectionContext = createContext();

// 해당 Context 를 제공하는 컴포넌트
const CardSelectionContextProvider = ({ children }) => {
  const [selectedCards, setSelectedCards] = useState([]);

  const toggle = (id) => {
    setSelectedCards((prev) => {
      const s = new Set(prev);
      
      // 현재 목록에 있으면 해당 id 를 가진 카드를 삭제
      if (s.has(id)) s.delete(id);
      
      // 없으면 추가
      else s.add(id);
      
      // 해당 Set 을 복사하여 새로운 배열 객체 반환환
      return Array.from(s);
    });
  };

  return (
    <CardSelectionContext.Provider value={{ selectedCards, toggle }}>
      {children}
    </CardSelectionContext.Provider>
  );
}

// Context 사용을 위한 Hook
const useCardSelection = () => {
  const context = useContext(CardSelectionContext);

  // 만약 Context Provider 바깥에서 이 Hook 을 호출하면 에러를 반환
  if (!context)
    throw new Error("useCardSelection 는 CardSelectionContextProvider 영역 안에서만 호출해야 합니다");

  return context;
}

export { CardSelectionContextProvider, useCardSelection };