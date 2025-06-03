import React, { useRef, useEffect, useState } from "react";
import patchRemindDisable from "../../functions/utils/patchRemindDisable";
import { useMutation } from "@tanstack/react-query";
import { EditButton } from "../../assets";

const RemindCard = ({ id, title, url, image, refetch, overlayAlpha }) => {
    const [showPopup, setShowPopup] = useState(false);
    const popupRef = useRef(null);

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

    // 팝업 외부 클릭 시 닫기
    useEffect(() => {
        if (!showPopup) return;
        const handleClick = (e) => {
            if (popupRef.current && !popupRef.current.contains(e.target)) {
                setShowPopup(false);
            }
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, [showPopup]);

    return (
        <div
            onClick={() => window.location.href = url}
            className={`
                relative w-full h-full rounded-[39px]
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

            {/* 1. 기존 오버레이 */}
            <div className="absolute inset-0 rounded-[39px] bg-bookmark-overlay z-10 pointer-events-none" />

            {/* 2. position별 추가 오버레이 (가장자리 어둡게) */}
            {overlayAlpha > 0 && (
                <div
                    className="absolute inset-0 rounded-[39px] z-20 pointer-events-none"
                    style={{ background: `rgba(0,0,0,${overlayAlpha})` }}
                />
            )}

            {/* Edit 버튼 */}
            <button
                className="absolute top-4 right-4 z-30 p-1"
                onClick={e => {
                    e.stopPropagation();
                    setShowPopup(true);
                }}
            >
                <EditButton className="h-5 w-5" />
            </button>

            {/* 팝업 */}
            {showPopup && (
                <div
                    ref={popupRef}
                    className="absolute inset-0 z-40 flex items-center justify-center"
                    style={{ background: "rgba(0,0,0,0.10)" }}
                >
                    <div
                        className="bg-white border rounded-lg shadow-lg p-4 flex flex-col items-center w-60"
                        onClick={e => e.stopPropagation()}
                    >
                        <button
                            className="px-4 py-2 rounded bg-main-500 hover:bg-main-600 text-white mb-2 shadow-sm w-full"
                            onClick={e => {
                                e.stopPropagation();
                                mutate(true);
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
                </div>
            )}

            {/* 텍스트 */}
            <div className="relative z-30">
                <p className="w-full text-lg font-bold text-left select-none text-white truncate">
                    {title}
                </p>
            </div>
        </div>
    );
};

export default RemindCard;
