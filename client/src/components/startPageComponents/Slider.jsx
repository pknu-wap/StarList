import { MockUpCard } from "../../assets";
import { Link, FolderOpen } from "../../assets";

const bookmarksTop = [
    { title: "초간단 김치볶음밥", img: "/picture/kimchi.webp" },
    { title: "식재료 보관법", img: "/picture/bogwan.webp" },
    { title: "10분컷 요리 모음", img: "/picture/noodle.webp" },
    { title: "원팬으로 만드는 라면 # 대박간단", img: "/picture/onepan.webp" },
];
const bookmarksBottom = [
    { title: "100원으로 진수성찬 만들기", img: "/picture/100.webp" },
    { title: "자취요리 1대장 식재료", img: "/picture/jachi.webp" },
    { title: "미친 볶음밥", img: "/picture/crazy.webp" },
    { title: "식재료 보관법", img: "/picture/bogwan.webp" },
    { title: "자취생 혼자 해먹는 저녁밥", img: "/picture/dinner.webp" },
];

const CARD_WIDTH = 382;
const CARD_GAP = 16; // gap-4 == 1rem == 16px

const getRowWidth = (bookmarks) =>
    bookmarks.length * CARD_WIDTH + (bookmarks.length - 1) * CARD_GAP;

const MarqueeRow = ({ bookmarks, duration = 16, style }) => (
    <div className="relative w-full h-auto overflow-hidden">
        <div
            className="flex gap-4 animate-marquee"
            style={{
                ...style,
                width: "max-content",
                animation: `marquee ${duration}s linear infinite`,
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
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover z-0 select-none"
                    />
                    <Link className="absolute w-10 h-10 top-3 right-3 z-20" />
                    <span className="absolute left-4 bottom-4 font-bold text-white text-lg drop-shadow z-10 select-none">
                        {item.title}
                    </span>
                </div>
            ))}
        </div>
    </div>
);



const SPEED = 40;

const Slider = () => {
    const widthTop = getRowWidth(bookmarksTop);
    const widthBottom = getRowWidth(bookmarksBottom);

    const durationTop = widthTop / SPEED;
    const durationBottom = widthBottom / SPEED;

    return (
        <div className="relative w-full h-[400px] mt-[76px]">
            {/* SVG 배경 */}
            <MockUpCard className="w-full h-full z-10 drop-shadow-lg" />
            <div className="flex absolute top-[10px] right-[54px] ">
                <FolderOpen className="w-[25px] h-[25px] z-20" />
                <p className="text-base font-semibold text-left ml-2 select-none">주말 요리 모음!</p>
            </div>

            {/* 2줄 롤링 */}
            <div className="absolute inset-0 flex flex-col justify-center space-y-5 z-20">
                <MarqueeRow
                    bookmarks={bookmarksTop}
                    duration={durationTop}
                    style={{}}
                />
                <MarqueeRow
                    bookmarks={bookmarksBottom}
                    duration={durationBottom}
                    style={{ marginLeft: `${CARD_WIDTH / 2}px` }}
                />

            </div>
        </div>
    );
};

export default Slider;
