import React, { useState } from "react";
import useFolderHistoryStore from "../../functions/hooks/useFolderHistoryStore";
import useSelectedCardsStore from "../../functions/hooks/useSelectedCardsStore";

import { FolderCardSvg } from "../../assets/";
import { EditButton } from "../../assets/";
import EditModal from "./EditModal";

const FolderCard = ({ info }) => {
    const push = useFolderHistoryStore((s) => s.push);
    const isSelected = useSelectedCardsStore((s) => s.selectedCards.includes(info.id));
    const toggle = useSelectedCardsStore((s) => s.toggle);
    const [isOpen, setIsOpen] = useState(false);

    // Ctrl 사용 여부에 따른 클릭 처리를 다르게 설정
    const handleClick = (e) => {
        // Ctrl + 클릭 → 토글
        if (e.ctrlKey || e.metaKey) {
            // Ctrl + 클릭 → 토글
            toggle(info.id);
        } else {
            // 일반 클릭 → 현재 위치를 업데이트
            push({ id: info.id, title: info.title });
        }
    };

    return (
        <>
            <div
                className="relative aspect-[390/270] w-full cursor-pointer transition-colors duration-200 sm:max-w-[310px] md:max-w-[350px] lg:max-w-[390px]"
                onClick={handleClick}
            >
                <FolderCardSvg
                    className={`h-full w-full stroke-current ${isSelected ? "text-main-500" : "text-gray-300"} transition-colors duration-200`}
                />
                <div className="absolute inset-x-6 bottom-6 z-20 flex items-center justify-between">
                    <p className="w-full truncate text-left text-base font-semibold text-main-black sm:text-lg md:text-xl">
                        {info.title}
                    </p>
                    <button
                        type="button"
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
                    mode="folder"
                    info={info}
                    onClose={() => setIsOpen(false)}
                    onSave={(updated) => {
                        console.log("폴더 업데이트:", updated);
                    }}
                />
            )}
        </>
    );
};

export default FolderCard;
