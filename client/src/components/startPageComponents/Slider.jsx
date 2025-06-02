import { MockUpCard } from "../../assets";

const bookmarksTop = [
    { title: "초간단 김치볶음밥" },
    { title: "10분컷 요리 모음" },
    { title: "에어프라이어로 만드는 오븐요리 5선" },
    // ...더 추가
];
const bookmarksBottom = [
    { title: "이어로 만드는 오븐요리 5선" },
    { title: "자취생 혼자 해먹는 간단 저녁" },
    { title: "자취요리 1대장 식재료" },
    { title: "미친 볶음밥" },
    // ...더 추가
];

const MarqueeRow = ({ bookmarks, offset = 0 }) => (
    <div className="relative w-full h-[120px] overflow-hidden">
        <div
            className="flex gap-4 animate-marquee"
            style={{
                width: "max-content",
                transform: `translateX(-${offset}px)`, // 시작 위치만 다르게
                animation: `marquee 16s linear infinite`,
            }}
        >
            {[...bookmarks, ...bookmarks].map((item, i) => (
                <div
                    key={i}
                    className="flex-shrink-0 w-52 h-[110px] rounded-lg bg-white shadow-lg flex items-end p-4"
                >
                    <span className="font-bold">{item.title}</span>
                </div>
            ))}
        </div>
    </div>
);

const Slider = () => (
    <div className="relative w-full max-w-[1100px] h-[260px] mx-auto">
        {/* SVG 배경 */}
        <MockUpCard
            width="100%"
            height="100%"
            className="absolute inset-0 w-full h-full z-0"
        />
        {/* 2줄 롤링 */}
        <div className="absolute inset-0 flex flex-col justify-center space-y-5 z-10 px-8">
            {/* 첫 줄: 어긋남 없음 */}
            <MarqueeRow bookmarks={bookmarksTop} offset={0} />
            {/* 두 번째 줄: 수평으로 어긋나게, 예시로 120px */}
            <MarqueeRow bookmarks={bookmarksBottom} offset={120} />
        </div>
    </div>
);

export default Slider;
