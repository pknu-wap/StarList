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
    const { data: bookmarks = [], isLoding, error } = useRemindBookmarks();

    // 현재 중앙에 보이는 슬라이드 인덱스 상태 저장
    const [activeIndex, setActiveIndex] = useState(2); // 시작 위치는 2번째부터
    // 커스텀 네비게이션 버튼
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const [swiperInstance, setSwiperInstance] = useState(null);


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

    if (isLoding) return <div>로딩 중...</div>;
    if (error) return <div>에러 발생: {error.message}</div>;

    return (
        <div className="w-full pt-[43px] flex flex-col items-start">
            <div className="flex flex-col items-start">
                <p className="w-[115px] h-[43px] text-[32px] font-bold text-left text-black">리마인드</p>
                <p className="w-[298px] h-[23px] text-[15px] font-bold text-left text-main-500">
                    최근에 덜 본 북마크를 다시 추천해드려요.
                </p>
            </div>
            <div className="w-[1494px] pt-[100px] relative">
                {/* 좌측 버튼 */}
                <button
                    ref={prevRef}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 z-30 p-2 bg-white rounded-full shadow-md"
                    type="button"
                >
                    <ArrowLeft className="w-6 h-6" />
                </button>

                {/* 우측 버튼 */}
                <button
                    ref={nextRef}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 z-30 p-2 bg-white rounded-full shadow-md"
                    type="button"
                >
                    <ArrowRight className="w-6 h-6" />
                </button>
                <Swiper
                    modules={[Navigation]}
                    navigation={{
                        prevEl: prevRef.current,
                        nextEl: nextRef.current,
                        // 클릭 가능하게
                        clickable: true,
                    }}
                    slidesPerView={5}
                    centeredSlides
                    onSwiper={setSwiperInstance}
                    onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)} // 슬라이드가 넘어갈 때 중앙 인덱스를 추적
                    initialSlide={2}
                    loop
                    className="!overflow-visible"
                >
                    {bookmarks.map((bm, idx) => {
                        // 중앙 북마크와의 거리 계산
                        let offset = idx - activeIndex;
                        const len = bookmarks.length;
                        if (offset > 2) offset -= len;
                        if (offset < -2) offset += len;

                        return (
                            <SwiperSlide key={idx}>
                                <div
                                    className={`relative transition-all duration-300 ease-in-out
                                                mx-2 ${getScaleClass(offset)}`}

                                    style={{
                                        minWidth: offset === 0 ? "36.6px" : "28.0px",
                                        minHeight: offset === 0 ? "24.4px" : "18.0px",
                                    }}
                                >
                                    {/* 카드 */}
                                    <RemindCard {...bm} />

                                    {/* 오버레이 */}
                                    <div
                                        className={`absolute inset-0 rounded-[39px] bg-black
                                                    ${getOverlayOpacity(offset)} 
                                                    pointer-events-none transition-all duration-300`}
                                    />
                                </div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>
        </div>
    );
}

export default RemindCarousel;