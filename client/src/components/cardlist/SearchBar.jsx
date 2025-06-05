import React, { useState } from "react";
import useSearchStore from "../../functions/stores/useSearchStore";
import { Search } from "../../assets";

const SearchBar = () => {
    const setKeyword = useSearchStore((s) => s.setKeyword);
    const finishSearch = useSearchStore((s) => s.finishSearch);

    const [input, setInput] = useState("");

    // 폼 submit (엔터) 시
    const handleSubmit = (e) => {
        e.preventDefault();
        setKeyword(input.trim()); // 공백 제거 후 전달
    };

    // input이 비워질 때만 검색 종료
    const handleInputChange = (e) => {
        const currentValue = e.target.value;
        setInput(currentValue);
        if (currentValue.trim() === "") finishSearch();
    };

    // X 버튼 클릭 시
    const handleClearClick = () => {
        setInput("");
        finishSearch();
    };

    return (
        <form
            name="search"
            onSubmit={handleSubmit}
            className={`relative w-full sm:w-[280px] md:w-[358px] lg:w-[358px]`}
        >
            <input
                type="text"
                name="keyword"
                placeholder="검색"
                required
                value={input}
                onChange={handleInputChange}
                className={`h-8 w-full rounded-full border-2 border-black px-3 text-xs placeholder-gray-500 focus:bg-gray-50 focus:outline-none sm:h-9 sm:px-4 sm:text-sm md:h-10 md:px-5 md:text-base lg:h-[43px] lg:px-6 lg:text-base`}
            />
            {input && (
                <button
                    type="button"
                    onClick={handleClearClick}
                    className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-400 hover:text-main-500"
                >
                    ×
                </button>
            )}
            <Search
                className={`absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 sm:right-3 sm:h-5 sm:w-5 md:right-4 md:h-6 md:w-6 lg:right-4 lg:h-6 lg:w-6`}
            />
        </form>
    );
};

export default SearchBar;
