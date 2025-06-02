import { MockUpCard } from "../../assets";
import { Link } from "../../assets";

const bookmarksTop = [
    { title: "초간단 김치볶음밥", img: "/picture/kimchi.jpg" },
    { title: "식재료 보관법", img: "/picture/bogwan.jpg" },
    { title: "10분컷 요리 모음", img: "/picture/noodle.jpg" },
    { title: "원팬으로 만드는 라면 # 대박간단", img: "/picture/onepan.jpg" },
];
const bookmarksBottom = [
    { title: "100원으로 진수성찬 만들기", img: "/picture/100.jpg" },
    { title: "자취요리 1대장 식재료", img: "/picture/jachi.jpg" },
    { title: "미친 볶음밥", img: "/picture/crazy.jpg" },
    { title: "자취생 혼자 해먹는 저녁밥", img: "/picture/dinner.jpg" },
    { title: "식재료 보관법", img: "/picture/bogwan.jpg" },
];

const MarqueeRow = ({ bookmarks, offset = 0 }) => (
    <div className="relative w-full h-auto overflow-hidden">
        <div
            className="flex gap-4 animate-marquee"
            style={{
                width: "max-content",
                transform: `translateX(-${offset}px)`,
                animation: `marquee 16s linear infinite`,
            }}
        >
            {[...bookmarks, ...bookmarks].map((item, i) => (
                <div
                    key={i}
                    className="
                        flex-shrink-0 w-[382px] h-[131px] relative
                        rounded-lg shadow-lg overflow-hidden
                    "
                >
                    <div className="absolute inset-0 w-full h-full object-cover z-10 bg-gradient-to-b from-zinc-900/0 via-zinc-900/25 to-zinc-900" />
                    <img
                        src={item.img}
                        alt={item.title}
                        className="absolute inset-0 w-full h-full object-cover z-0 select-none"
                    />
                    <Link className="absolute w-8 h-8 top-3 right-3 z-20" />
                    <span className="absolute left-4 bottom-4 font-bold text-white text-lg drop-shadow z-10 select-none">
                        {item.title}
                    </span>
                </div>
            ))}
        </div>
    </div>
);

const Slider = () => (
    <div className="relative w-full h-[400px] mt-[76px]">
        {/* SVG 배경 */}
        <MockUpCard className="w-full h-full z-0 drop-shadow-lg" />
        {/* 2줄 롤링 */}
        <div className="absolute inset-0 flex flex-col justify-center space-y-5 z-10">
            <MarqueeRow bookmarks={bookmarksTop} offset={0} />
            <MarqueeRow bookmarks={bookmarksBottom} offset={120} />
        </div>
    </div>
);

export default Slider;
