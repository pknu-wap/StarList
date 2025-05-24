import React from "react";
import ToggleButton from "./ToggleButton";

/**
 * 북마크 카드 컴포넌트
 * @param {object} info // 북마크 정보
 * @param {boolean} selected   // 부모가 넘겨줄 선택 상태
 * @param {() => void} onToggle // 부모가 넘겨줄 토글 핸들러
 */

const BookmarkCard = ({ info, selected, onToggle }) => { // 시간 필요시 image,dataAdded prop 추가
    /*
    const formattedTime = new Date(dataAdded * 1000).toLocaleTimeString("ko-KR", {
        hour: "2-digit",
        minute: "2-digit",
    });
    
    */

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
                    onClick={onToggle} />
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

            {/* 시간 
                <span className="text-[22px] font-medium text-[#8d87a2] whitespace-nowrap">
                    {formattedTime}
                </span>
                */}

        </div>
    );
}
export default BookmarkCard;