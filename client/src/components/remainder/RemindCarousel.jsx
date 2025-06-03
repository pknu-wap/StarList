import React, { useState, useEffect } from "react";
import RemindCard from "./RemindCard";
import useRemindBookmarks from "../../functions/hooks/useRemindBookmarks";
import { ArrowLeft, ArrowRight } from "../../assets";

const CARD_SIZES = [
    { width: 192, height: 127 },   // 가장 왼쪽
    { width: 264, height: 188 },   // 왼쪽
    { width: 366, height: 240 },   // 중앙
    { width: 264, height: 188 },   // 오른쪽
    { width: 192, height: 127 },   // 가장 오른쪽
];
const OVERLAYS = [
    "opacity-40",
    "opacity-20",
    "opacity-0",
    "opacity-20",
    "opacity-40",
];
const CARD_MARGIN = 40;
const BUTTON_SIZE = 44;
const CAROUSEL_ROW_WIDTH =
    CARD_SIZES.reduce((sum, c) => sum + c.width, 0) +
    CARD_MARGIN * 4 +
    BUTTON_SIZE * 2 +
    40; // 버튼-카드 사이 여유

const RemindCarousel = () => {
    const { data: bookmarks = [], isLoading, error, refetch } = useRemindBookmarks();
    const [centerIdx, setCenterIdx] = useState(2);

    // remindDisabled가 false인 북마크만 표시
    const visibleBookmarks = bookmarks.filter(b => !b.remindDisabled);
    // SYNC_SUCCESS 메시지 감지 → refetch
    useEffect(() => {
        function handleSyncSuccess(event) {
            if (event.source !== window) return;
            if (event.data.type !== "SYNC_SUCCESS") return;
            refetch();
        }
        window.addEventListener("message", handleSyncSuccess);
        return () => window.removeEventListener("message", handleSyncSuccess);
    }, [refetch]);

    if (isLoading) return null;
    if (error || visibleBookmarks.length === 0)
        return (
            <div className="flex items-center justify-center w-full h-[240px]">
                <span className="text-2xl text-gray-300">오래된 북마크가 없네요!</span>
            </div>
        );

    const getDisplayIndexes = () => {
        const len = visibleBookmarks.length;
        // visibleBookmarks가 없는 경우 빈 배열 반환 (이미 상단에서 처리한 경우일 수 있음)
        if (len === 0) return [];
        let arr = [];
        // -2부터 2까지의 범위를 사용하여 항상 5개의 인덱스 생성
        for (let i = -2; i <= 2; i++) {
            arr.push((centerIdx + i + len) % len);
        }
        return arr;
    };

    const handlePrev = () =>
        setCenterIdx(idx => (idx - 1 + visibleBookmarks.length) % visibleBookmarks.length);
    const handleNext = () => setCenterIdx(idx => (idx + 1) % visibleBookmarks.length);

    const displayIndexes = getDisplayIndexes();

    return (

        <div className="w-full flex flex-col items-center gap-y-4 p-10">
            {/* 제목 */}
            <div className="flex w-full items-baseline space-x-2 mb-2">
                <p className="text-3xl font-bold text-black">리마인드</p>
                <p className="text-lg font-bold text-main-500">
                    최근에 덜 본 북마크를 다시 추천해드려요.
                </p>
            </div>

            {/* 캐러셀 카드라인 */}
            <div
                className="relative flex items-center"
                style={{
                    // 중앙정렬, maxWidth만 제한, height 고정
                    maxWidth: `${CAROUSEL_ROW_WIDTH}px`,
                    width: "100%",
                    height: "240px",
                }}
            >
                {/* 왼쪽 네비게이션 버튼 */}
                <button
                    onClick={handlePrev}
                    className="z-10 flex items-center justify-center"
                    style={{
                        width: `${BUTTON_SIZE}px`,
                        height: `${BUTTON_SIZE}px`,
                        marginRight: "16px",
                        fontSize: "32px",
                        color: "#111",
                        border: "none",
                    }}
                >
                    <ArrowLeft className="w-[17.5px] h-8" />
                </button>

                {/* 카드 5장 */}
                <div className="flex items-center">
                    {displayIndexes.map((realIdx, pos) => (
                        <div
                            key={`${pos}-${realIdx}`} // 고유 key 설정
                            style={{
                                width: `${CARD_SIZES[pos].width}px`,
                                height: `${CARD_SIZES[pos].height}px`,
                                marginRight: pos === 4 ? 0 : CARD_MARGIN,
                                zIndex: pos === 2 ? 10 : pos === 1 || pos === 3 ? 5 : 0,
                                overflow: "hidden",
                                display: "flex",
                                position: "relative",
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: "39px",
                                background: "transparent",
                            }}
                            className="relative"
                        >
                            <RemindCard {...visibleBookmarks[realIdx]} refetch={refetch} />
                            <div
                                className={`absolute inset-0 rounded-[39px] bg-black ${OVERLAYS[pos]} pointer-events-none transition-opacity duration-300`}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    top: 0,
                                    left: 0,
                                    pointerEvents: "none",
                                    zIndex: 20,
                                }}
                            />
                        </div>
                    ))}
                </div>

                {/* 오른쪽 네비게이션 버튼 */}
                <button
                    onClick={handleNext}
                    className="z-10 flex items-center justify-center"
                    style={{
                        width: `${BUTTON_SIZE}px`,
                        height: `${BUTTON_SIZE}px`,
                        marginLeft: "16px",
                        fontSize: "32px",
                        color: "#111",
                        border: "none",
                    }}
                >
                    <ArrowRight className="w-[17.5px] h-8" />
                </button>
            </div>
        </div>
    );
};

export default RemindCarousel;
