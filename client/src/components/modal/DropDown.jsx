import { useState } from "react";

/**
 * options: { id: number, title: string }[] 형태의 배열
 * selected: 현재 선택된 옵션 객체
 * setSelected: 선택된 옵션을 업데이트하는 함수
 */
const DropDown = ({ options, selected, setSelected }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (option) => {
        setSelected(option);
        setIsOpen(false);
    };

    return (
        <div className="relative inline-block w-full">
            <button
                type="button"
                className="w-full text-left border border-gray-300 rounded px-3 py-2 flex justify-between items-center"
                onClick={() => setIsOpen((prev) => !prev)}
            >
                {selected.title}
                <span className="ml-2">{isOpen ? "▲" : "▼"}</span>
            </button>
            {isOpen && (
                <ul className="absolute mt-1 w-full bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-auto z-10">
                    {options.map((option) => (
                        <li
                            key={option.id}
                            className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
                            onClick={() => handleSelect(option)}
                        >
                            {option.title}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default DropDown;
