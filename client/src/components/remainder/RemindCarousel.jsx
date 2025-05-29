import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import RemindCard from "./RemindCard";
import useRemindBookmarks from "../../functions/hooks/useRemindBookmarks";
import { ArrowLeft, ArrowRight } from "../../assets";

/* getOverlayOpacity, getScaleClass: 중앙 북마크와의 거리에 따라 스타일을 다르게 적용하는 함수들 */
// 멀어질수록 점점 어두워지도록
const getOverlayOpacity = (offset) => {
    switch (offset) {
        case 0:
            return "opacity-0";
        case -1:
        case 1:
            return "opacity-20";
        case -2:
        case 2:
            return "opacity-50";
        default:
            return "opacity-60";
    }
};
// 멀어질수록 점점 작아지도록
const getScaleClass = (offset) => {
    switch (offset) {
        case 0:
            return "scale-100 z-20";
        case -1:
        case 1:
            return "scale-90 z-10";
        case -2:
        case 2:
            return "scale-75 z-0";
        default:
            return "scale-60 z-0 pointer-events-none hidden";
    }
};

const RemindCarousel = () => {
    // 리마인더 북마크 데이터 가져오기
    const { data: bookmarks = [], isLoading, error } = useRemindBookmarks();
    // 현재 중앙에 보이는 슬라이드 인덱스 상태 저장
    const [activeIndex, setActiveIndex] = useState(2); // 시작 위치는 2번째부터
    const [swiperInstance, setSwiperInstance] = useState(null);
    // 커스텀 네비게이션 버튼
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    // Swiper 초기화 후에 커스텀 네비게이션 버튼을 연결
    useEffect(() => {
        if (swiperInstance && prevRef.current && nextRef.current) {
            swiperInstance.params.navigation.prevEl = prevRef.current;
            swiperInstance.params.navigation.nextEl = nextRef.current;
            // 네비게이션 모듈 초기화 & 업데이트
            swiperInstance.navigation.init();
            swiperInstance.navigation.update();
        }
    }, [swiperInstance]);

    return (
        <div className="flex flex-col items-center justify-between px-10">
            {/* 제목 */}
            <div className="flex w-full items-center justify-start space-x-2">
                <p className="text-left text-3xl font-bold text-black sm:text-lg md:text-2xl lg:text-3xl">리마인드</p>
                <p className="text-left text-lg font-bold text-main-500 sm:text-sm md:text-base lg:text-lg">
                    최근에 덜 본 북마크를 다시 추천해드려요.
                </p>
            </div>

            {/* 캐러셀 / 플레이스 홀더 */}
            <div className="relative my-auto w-full">
                {/* 좌측 버튼 */}
                <button
                    ref={prevRef}
                    className="absolute left-0 top-1/2 z-30 -translate-y-1/2 transform rounded-full bg-white p-2 shadow-md"
                    type="button"
                >
                    <ArrowLeft className="h-6 w-6" />
                </button>

                {/* 우측 버튼 */}
                <button
                    ref={nextRef}
                    className="absolute right-0 top-1/2 z-30 -translate-y-1/2 transform rounded-full bg-white p-2 shadow-md"
                    type="button"
                >
                    <ArrowRight className="h-6 w-6" />
                </button>

                {/* 로딩 중에는 빈 상태 유지 */}
                {isLoading ? null /* 로딩 완료 후, 에러이거나 데이터가 하나도 없으면 플레이스홀더 */ : error ||
                  bookmarks.length === 0 ? (
                    <div className="flex items-center justify-center">
                        <span className="text-2xl text-gray-300">아무것도 없네요</span>
                    </div>
                ) : (
                    // 데이터가 있으면 Swiper 렌더링
                    <Swiper
                        modules={[Navigation]}
                        navigation
                        slidesPerView="auto"
                        spaceBetween={16}
                        centeredSlides
                        initialSlide={2}
                        loop
                        onSwiper={setSwiperInstance}
                        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)} // 슬라이드가 넘어갈 때 중앙 인덱스를 추적
                        className="!overflow-visible"
                    >
                        {bookmarks.map((bm, idx) => {
                            // 중앙 북마크와의 거리 계산
                            let offset = idx - activeIndex;
                            const len = bookmarks.length;
                            if (offset > len / 2) offset -= len;
                            if (offset < -len / 2) offset += len;

                            // 카드 크기 직접 지정
                            const width = offset === 0 ? 363 : Math.abs(offset) === 1 ? 284 : 160;
                            const height = offset === 0 ? 240 : Math.abs(offset) === 1 ? 168 : 106;

                            return (
                                <SwiperSlide key={idx}>
                                    <div
                                        className={`relative mx-2 transition-all duration-300 ease-in-out ${getScaleClass(
                                            offset,
                                        )}`}
                                        style={{ width, height }} // 직접 width/height 지정
                                    >
                                        {/* 카드 */}
                                        <RemindCard {...bm} />

                                        {/* 오버레이 */}
                                        <div
                                            className={`absolute inset-0 rounded-[39px] bg-black ${getOverlayOpacity(
                                                offset,
                                            )} pointer-events-none transition-opacity duration-300`}
                                        />
                                    </div>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                )}
            </div>
        </div>
    );
};

export default RemindCarousel;
