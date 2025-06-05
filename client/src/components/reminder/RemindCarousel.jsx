import React, { useState, useEffect } from "react";
import RemindCard from "./RemindCard";
import useRemindBookmarks from "../../functions/hooks/useRemindBookmarks";
import { ArrowLeft, ArrowRight } from "../../assets";
import { SyncLoader } from "react-spinners";

// 각 카드 크기
const CARD_SIZES_LIST = {
    5: [
        { width: 192, height: 127 },
        { width: 264, height: 188 },
        { width: 366, height: 240 },
        { width: 264, height: 188 },
        { width: 192, height: 127 },
    ],
    3: [
        { width: 264, height: 188 },
        { width: 366, height: 240 },
        { width: 264, height: 188 },
    ],
    1: [{ width: 366, height: 240 }],
};

// 각 위치별 오버레이 투명도
const OVERLAY_ALPHA_LIST = {
    5: [0.5, 0.32, 0.12, 0.32, 0.5],
    3: [0.32, 0.12, 0.32],
    1: [0.12],
};

const CARD_MARGIN_LIST = {
    5: 40,
    3: 24,
    1: 0,
};

const BUTTON_SIZE = 44;

// 화면 크기 감지 훅
function useBreakpoint() {
    const [breakpoint, setBreakpoint] = useState("lg");
    useEffect(() => {
        const updateBreakpoint = () => {
            if (window.innerWidth < 640) setBreakpoint("sm");
            else if (window.innerWidth < 1024) setBreakpoint("md");
            else setBreakpoint("lg");
        };
        updateBreakpoint();
        window.addEventListener("resize", updateBreakpoint);
        return () => window.removeEventListener("resize", updateBreakpoint);
    }, []);
    return breakpoint;
}

const RemindCarousel = () => {
    const { data: bookmarks = [], status, refetch } = useRemindBookmarks();
    const [centerIdx, setCenterIdx] = useState(0);
    const breakpoint = useBreakpoint();

    // 비활성화된 북마크 필터링
    const visibleBookmarks = bookmarks.filter((bookmark) => !bookmark.remindDisabled);

    // 화면 크기에 따라 보여줄 카드 수 결정
    const visibleCardCount = breakpoint === "sm" ? 1 : breakpoint === "md" ? 3 : 5;
    const CARD_SIZES = CARD_SIZES_LIST[visibleCardCount];
    const OVERLAY_ALPHA = OVERLAY_ALPHA_LIST[visibleCardCount];
    const CARD_MARGIN = CARD_MARGIN_LIST[visibleCardCount];

    // 보여줄 카드 인덱스 계산
    const getDisplayIndexes = () => {
        const len = visibleBookmarks.length;
        if (len === 0) return []; // 북마크가 없으면 빈 배열 반환

        const half = Math.floor(visibleCardCount / 2);
        let indexes = [];

        for (let i = -half; i <= half; i++) {
            // 북마크 개수가 visibleCardCount보다 적을 경우 반복해서 보여줌
            indexes.push((centerIdx + i + len) % len);
        }

        return indexes.slice(0, Math.min(visibleCardCount, len));
    };

    const displayIndexes = getDisplayIndexes();

    const handlePrev = () => {
        if (visibleBookmarks.length === 0) return; // 북마크가 없으면 동작하지 않음
        setCenterIdx((prev) => (prev - 1 + visibleBookmarks.length) % visibleBookmarks.length);
    };

    const handleNext = () => {
        if (visibleBookmarks.length === 0) return; // 북마크가 없으면 동작하지 않음
        setCenterIdx((prev) => (prev + 1) % visibleBookmarks.length);
    };

    // 로딩중이거나나 Sync 오류일 경우
    if (status === "pending" || status === "error") {
        return (
            <div className="my-4 flex w-full flex-col items-center gap-y-4 px-10">
                {/* 제목 */}
                <div className="mb-2 flex w-full items-baseline space-x-2">
                    <p className="text-xl font-bold text-black md:text-3xl">리마인드</p>
                    <p className="text-sm font-bold text-main-500 md:text-lg">
                        최근에 덜 본 북마크를 다시 추천해드려요.
                    </p>
                </div>
                <div className="flex w-full items-center justify-center py-36">
                    <SyncLoader color="#7349D6" size={15} />
                </div>
            </div>
        );
    }

    // 에러 발생
    // if (status === "error") {
    //     console.error(error);
    //     return (
    //         <div className="my-4 flex w-full flex-col items-center gap-y-4 px-10">
    //             {/* 제목 */}
    //             <div className="mb-2 flex w-full items-baseline space-x-2">
    //                 <p className="text-xl font-bold text-black md:text-3xl">리마인드</p>
    //                 <p className="text-sm font-bold text-main-500 md:text-lg">
    //                     최근에 덜 본 북마크를 다시 추천해드려요.
    //                 </p>
    //             </div>
    //             <div className="flex w-full items-center justify-center py-36">
    //                 <span className="text-center text-2xl text-gray-300">에러 발생! 잠시만 기다려주세요...</span>
    //             </div>
    //         </div>
    //     );
    // }

    // 데이터가 없다면
    if (bookmarks.length === 0) {
        return (
            <div className="my-4 flex w-full flex-col items-center gap-y-4 px-10">
                {/* 제목 */}
                <div className="mb-2 flex w-full items-baseline space-x-2">
                    <p className="text-xl font-bold text-black md:text-3xl">리마인드</p>
                    <p className="text-sm font-bold text-main-500 md:text-lg">
                        최근에 덜 본 북마크를 다시 추천해드려요.
                    </p>
                </div>
                <div className="flex w-full items-center justify-center py-36">
                    <span className="text-center text-2xl text-gray-300">오래된 북마크가 없네요!</span>
                </div>
            </div>
        );
    }

    // 정상적으로 데이터를 받아온다면
    return (
        <div className="flex w-full flex-col items-center gap-y-4 p-4">
            {/* 제목 */}
            <div className="mb-2 flex w-full items-baseline space-x-2">
                <p className="text-xl font-bold text-black md:text-3xl">리마인드</p>
                <p className="text-sm font-bold text-main-500 md:text-lg">최근에 덜 본 북마크를 다시 추천해드려요.</p>
            </div>

            {/* 캐러셀 */}
            <div
                className="relative flex w-full items-center overflow-hidden"
                style={{
                    height: `${CARD_SIZES[Math.floor(visibleCardCount / 2)].height}px`,
                    minHeight: 120,
                }}
            >
                {/* 왼쪽 버튼 */}
                <button
                    onClick={handlePrev}
                    className="z-10 flex items-center justify-center"
                    style={{
                        width: `${BUTTON_SIZE}px`,
                        height: `${BUTTON_SIZE}px`,
                        marginRight: "8px",
                        fontSize: "24px",
                        color: "#111",
                        border: "none",
                        background: "none",
                    }}
                    aria-label="이전 북마크"
                    tabIndex={0}
                >
                    <ArrowLeft className="h-6 w-5 md:h-8 md:w-[17.5px]" />
                </button>

                {/* 카드들 */}
                <div className="flex w-full items-center justify-center">
                    {displayIndexes.map((realIdx, pos) => {
                        if (!visibleBookmarks[realIdx]) return null;
                        return (
                            <div
                                key={realIdx}
                                style={{
                                    width: `${CARD_SIZES[pos].width}px`,
                                    height: `${CARD_SIZES[pos].height}px`,
                                    marginRight: pos === visibleCardCount - 1 ? 0 : CARD_MARGIN,
                                    zIndex: pos === Math.floor(visibleCardCount / 2) ? 10 : 5,
                                    overflow: "hidden",
                                    display: "flex",
                                    position: "relative",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderRadius: "39px",
                                    background: "transparent",
                                    minWidth: 0,
                                    minHeight: 0,
                                }}
                                className="relative"
                            >
                                <RemindCard
                                    {...visibleBookmarks[realIdx]}
                                    refetch={refetch}
                                    overlayAlpha={OVERLAY_ALPHA[pos]}
                                />
                            </div>
                        );
                    })}
                </div>

                {/* 오른쪽 버튼 */}
                <button
                    onClick={handleNext}
                    className="z-10 flex items-center justify-center"
                    style={{
                        width: `${BUTTON_SIZE}px`,
                        height: `${BUTTON_SIZE}px`,
                        marginLeft: "8px",
                        fontSize: "24px",
                        color: "#111",
                        border: "none",
                        background: "none",
                    }}
                    aria-label="다음 북마크"
                    tabIndex={0}
                >
                    <ArrowRight className="h-6 w-5 md:h-8 md:w-[17.5px]" />
                </button>
            </div>
        </div>
    );
};

export default RemindCarousel;
