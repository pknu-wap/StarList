import React, { useState } from "react";
import useFolderHistoryStore from "../../functions/hooks/useFolderHistoryStore";
import useSelectedCardsStore from "../../functions/hooks/useSelectedCardsStore";

import { FolderCardSvg } from "../../assets/";
import { EditButton } from "../../assets/";
import FolderEditModal from "./FolderEditModal";

const FolderCard = ({ info }) => {
    // 폴더 카드 클릭시 현재 history 를 변경
    const push = useFolderHistoryStore((s) => s.push);

    // Ctrl + 좌클릭을 이용하여 해당 카드를 선택 가능
    const isSelected = useSelectedCardsStore((s) =>
        s.selectedCards.some((card) => card.id === info.id && card.type === "folder"),
    );
    const toggle = useSelectedCardsStore((s) => s.toggle);

    // 옵션 버튼 클릭시 모달창 생성
    const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);

    // Ctrl 사용 여부에 따른 클릭 처리를 다르게 설정
    const handleClick = (e) => {
        if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            toggle(info.id, "folder");
        } else {
            push({ id: info.id, title: info.title });
        }
    };

    return (
        <>
            <div
                className="relative aspect-[360/240] w-full cursor-pointer drop-shadow-lg transition-colors duration-200 sm:max-w-[280px] md:max-w-[320px] lg:max-w-[360px]"
                onClick={handleClick}
            >
                <FolderCardSvg
                    className={`h-full w-full stroke-current ${isSelected ? "text-main-500" : "text-gray-300"} transition-colors duration-200`}
                />
                {/* bottom, inset 값을 반응형으로 하려면 추가해야함 */}
                <div className="absolute inset-x-6 bottom-6 z-20 flex items-center justify-between">
                    <p className="w-full truncate text-left text-base font-semibold text-main-black sm:text-lg md:text-xl">
                        {info.title}
                    </p>
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsFolderModalOpen(true);
                        }}
                        className="p-1 text-gray-400 hover:text-main-500"
                    >
                        <EditButton className="h-5 w-5" />
                    </button>
                </div>
            </div>
            {isFolderModalOpen && <FolderEditModal info={info} onClose={() => setIsFolderModalOpen(false)} />}
        </>
    );
};

export default FolderCard;
