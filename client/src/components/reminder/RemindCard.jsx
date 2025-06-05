import React, { useRef, useEffect, useState } from "react";
import patchRemindDisable from "../../functions/apis/patchRemindDisable";
import { useMutation } from "@tanstack/react-query";
import { EditButton } from "../../assets";
import defaultImage from "../../assets/default/default-image.svg";

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

    // 클릭 시 새 창으로 열기
    const handleClick = (e) => {
        e.preventDefault();
        window.open(url, "_blank", "noopener");
    };

    return (
        <div
            onClick={handleClick}
            className={`relative flex h-full w-full cursor-pointer flex-col justify-end rounded-[39px] border border-gray-300 p-4 shadow-card`}
        >
            {/* 썸네일 */}
            <div className="absolute inset-0 z-0">
                <img
                    src={image || defaultImage} // 이미지가 없으면 대체 이미지를 사용
                    alt={title}
                    loading="lazy"
                    className="h-full w-full rounded-[39px] object-cover"
                />
            </div>

            {/* 카드 자체 오버레이 */}
            <div className="pointer-events-none absolute inset-0 z-10 rounded-[39px] bg-bookmark-overlay" />

            {/* position별 추가 오버레이 (가장자리 어둡게) */}
            {overlayAlpha > 0 && (
                <div
                    className="pointer-events-none absolute inset-0 z-20 rounded-[39px]"
                    style={{ background: `rgba(0,0,0,${overlayAlpha})` }}
                />
            )}

            {/* Edit 버튼 */}
            <button
                className="absolute right-4 top-4 z-30 p-1"
                onClick={(e) => {
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
                        className="flex w-60 flex-col items-center rounded-[12px] border bg-white p-4 shadow-lg"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="mb-2 w-full rounded-[12px] bg-main-500 px-4 py-2 text-white shadow-sm hover:bg-main-600"
                            onClick={(e) => {
                                e.stopPropagation();
                                mutate(true);
                            }}
                            disabled={isLoading}
                        >
                            {isLoading ? "처리 중..." : "이 북마크 안보기"}
                        </button>
                        <button
                            className="text-xs text-gray-400 hover:text-black"
                            onClick={(e) => {
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
                <p className="w-full select-none truncate text-left text-lg font-bold text-white">{title}</p>
            </div>
        </div>
    );
};

export default RemindCard;