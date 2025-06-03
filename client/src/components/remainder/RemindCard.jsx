import React, { useState } from "react";
import { EditButton } from "../../assets";
import patchRemindDisable from "../../functions/utils/patchRemindDisable";
import { useMutation } from "@tanstack/react-query";

const RemindCard = ({ id, title, url, image, refetch }) => {
    const [showPopup, setShowPopup] = useState(false);

    const { mutate, isLoading } = useMutation({
        mutationFn: (remindDisabled) => patchRemindDisable(id, remindDisabled),
        onSuccess: () => {
            setShowPopup(false);
            if (refetch) refetch();
        },
        onError: () => {
            alert("잠시 후 다시 시도해주세요.");
        },
    });

    return (
        <div
            onClick={() => window.location.href = url}
            className={`
                relative w-full h-full rounded-[39px] overflow-hidden 
                flex flex-col justify-end p-4 border border-gray-300
                cursor-pointer shadow-card
            `}
        >
            {/* 썸네일 */}
            {image && (
                <div className="absolute inset-0 z-0">
                    <img
                        src={image}
                        alt={title}
                        loading="lazy"
                        className="w-full h-full object-cover rounded-[39px]"
                    />
                </div>
            )}

            {/* 오버레이 */}
            <div className="absolute inset-0 rounded-[39px] bg-bookmark-overlay z-10 pointer-events-none" />

            {/* Edit 버튼 */}
            <button
                className="absolute top-4 right-4 z-20 p-1"
                onClick={e => {
                    e.stopPropagation();
                    setShowPopup(true);
                }}
            >
                <EditButton className="h-5 w-5" />
            </button>

            {/* 팝업 */}
            {showPopup && (
                <div className="absolute top-10 right-4 z-30 bg-white border rounded-lg shadow-lg p-4 flex flex-col items-center">
                    <button
                        className="px-4 py-2 rounded bg-main-500 text-white mb-2"
                        onClick={e => {
                            e.stopPropagation();
                            mutate(true); // 리마인드 끄기
                        }}
                        disabled={isLoading}
                    >
                        {isLoading ? "처리 중..." : "이 북마크 안보기"}
                    </button>
                    <button
                        className="text-xs text-gray-400 hover:text-black"
                        onClick={e => {
                            e.stopPropagation();
                            setShowPopup(false);
                        }}
                    >
                        닫기
                    </button>
                </div>
            )}

            {/* 텍스트 */}
            <div className="relative z-20">
                <p className="w-full text-lg font-bold text-left select-none text-white truncate">
                    {title}
                </p>
            </div>
        </div>
    );
};

export default RemindCard;