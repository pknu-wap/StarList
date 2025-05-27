import React from "react";
import useSelectedCardsStore from "../../functions/hooks/useSelectedCardsStore";

import ToggleButton from "./ToggleButton";

const BookmarkCard = ({ info }) => {
    const selectedCards = useSelectedCardsStore(s => s.selectedCards);
    const toggle = useSelectedCardsStore(s => s.toggle);
    
    const selected = selectedCards.includes(info.id);

    return (
        <div className={`relative w-full sm:max-w-[280px] md:max-w-[320px] lg:max-w-[366px] aspect-[3/2] 
                            rounded-[39px] bg-white shadow-card
                            p-4 flex flex-col justify-end group transition-colors duration-200
                            border ${selected ? "border-main-500" : "border-gray-300"}
                            hover:bg-gradient-to-b hover:from-gray-200 hover:to-white
                            `}
        >
            {/* 썸네일 
                    <img
                    src={image}
                />
                */}
            {/* 토글 버튼 */}
            <div className={`absolute top-[25px] left-[28px]
                                transition-opacity duration-200
                                ${selected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                }`
            }>
                <ToggleButton
                    selected={selected}
                    onClick={() => toggle(info.id)} />
            </div>
            {/* 제목 */}
            <a
                href={info.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-base sm:text-lg md:text-xl 
                        font-semibold text-left
                         text-main-black truncate" // turncate는 제목이 너무 길어지면 뒷부분을 ... 으로 처리
            >
                {info.title}
            </a>
        </div>
    );
}
export default BookmarkCard;