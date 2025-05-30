import React, { useState } from "react";
import useSearchStore from "../../functions/hooks/useSearchStore";
import { Search } from "../../assets";

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
        <form name="search" onSubmit={handleSubmit} className="relative w-[358px]">
            <input
                type="text"
                name="keyword"
                placeholder="검색"
                required
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onBlur={handleBlur}
                className="w-full h-[43px] rounded-[78px] border-2 border-black px-6 placeholder-gray-500 focus:outline-none focus:bg-gray-50"
            />
            <Search className="absolute right-4 top-1/2 w-6 h-6 -translate-y-1/2 text-gray-500" />
        </form>
    );
};

export default SearchBar;
