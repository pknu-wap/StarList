import React, { useState } from "react";
import useSearchStore from "../../functions/hooks/useSearchStore";

const SearchBar = () => {
    const setKeyword = useSearchStore((s) => s.setKeyword);
    const clear = useSearchStore((s) => s.clear);

    const [input, setInput] = useState("");

    // 폼 submit (엔터) 시
    const handleSubmit = (e) => {
        e.preventDefault();
        setKeyword(input.trim()); // 공백 제거 후 전달
    };

    // input 포커스 잃을 때(clear)
    const handleBlur = () => {
        clear();
        setInput(""); // 입력창도 비워주면 UX적으로 좋음
    };

    return (
        <form name="search" onSubmit={handleSubmit}>
            <input
                type="text"
                name="keyword"
                placeholder="검색"
                required
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onBlur={handleBlur}
                className="rounded border px-3 py-2"
            />
        </form>
    );
};

export default SearchBar;
