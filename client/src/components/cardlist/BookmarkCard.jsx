import React, { useState } from "react";
import useSelectedCardsStore from "../../functions/hooks/useSelectedCardsStore";

import ToggleButton from "./ToggleButton";
import { EditButton } from "../../assets/";
import EditModal from "./EditModal";

const BookmarkCard = ({ info }) => {
    // 카드 선택 여부를 조작하기 위한 코드
    const isSelected = useSelectedCardsStore((s) =>
        s.selectedCards.some((card) => card.id === info.id && card.type === "bookmark"),
    );
    const toggle = useSelectedCardsStore((s) => s.toggle);

    // 옵션 버튼 클릭시 모달창 생성
    const [isOpen, setIsOpen] = useState(false);

    // Ctrl 사용 여부에 따른 클릭 처리를 다르게 설정
    const handleClick = (e) => {
        if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            toggle(info.id, "bookmark");
        } else {
            window.open(info.url, "_blank", "noopener");
        }
    };

    return (
        <>
            <div
                onClick={handleClick}
                className={`relative aspect-[360/240] w-full rounded-[30px] border bg-white shadow-card sm:max-w-[280px] md:max-w-[320px] lg:max-w-[360px] ${isSelected ? "border-main-500" : "border-gray-300"} group flex flex-col justify-end transition-colors duration-200 hover:bg-gradient-to-b hover:from-gray-200 hover:to-white`}
            >
                <img
                    src={info.image}
                    alt={info.title}
                    className="absolute inset-0 z-0 h-full w-full rounded-[30px] object-cover"
                    loading="lazy"
                    style={{}}
                />
                <div className="pointer-events-none absolute inset-0 z-10 rounded-[30px] bg-bookmark-overlay" />
                <div
                    className={`absolute left-[25px] top-[25px] transition-opacity duration-200 ${isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"} `}
                >
                    <ToggleButton
                        selected={isSelected}
                        onClick={(e) => {
                            e.stopPropagation();
                            toggle(info.id, "bookmark");
                        }}
                    />
                </div>
                <div className="absolute inset-x-4 bottom-4 z-20 flex items-center justify-between">
                    <p className="w-full truncate text-left text-base font-semibold text-main-white sm:text-lg md:text-xl">
                        {info.title}
                    </p>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsOpen(true);
                        }}
                        className="p-1 text-gray-400 hover:text-main-500"
                    >
                        <EditButton className="h-5 w-5" />
                    </button>
                </div>
            </div>
            {isOpen && (
                <EditModal
                    mode="bookmark"
                    info={info}
                    onClose={() => setIsOpen(false)}
                    onSave={(updated) => {
                        console.log("북마크 업데이트:", updated);
                    }}
                />
            )}
        </>
    );
};

export default BookmarkCard;
