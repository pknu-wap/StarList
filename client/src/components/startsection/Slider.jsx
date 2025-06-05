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

const getRowWidth = (bookmarks) => bookmarks.length * CARD_WIDTH + (bookmarks.length - 1) * CARD_GAP;

const MarqueeRow = ({ bookmarks, duration = 16, style }) => (
    <div className="relative h-auto w-full overflow-hidden">
        <div
            className="animate-marquee flex gap-4"
            style={{
                ...style,
                width: "max-content",
                animation: `marquee ${duration}s linear infinite`,
            }}
        >
            {[...bookmarks, ...bookmarks].map((item, i) => (
                <div
                    key={i}
                    className="relative h-[131px] w-[382px] flex-shrink-0 overflow-hidden rounded-lg shadow-lg"
                >
                    <div className="absolute inset-0 z-10 h-full w-full bg-gradient-to-b from-zinc-900/0 via-zinc-900/25 to-zinc-900 object-cover" />
                    <img
                        src={item.img}
                        alt={item.title}
                        loading="lazy"
                        className="absolute inset-0 z-0 h-full w-full select-none object-cover"
                    />
                    <Link className="absolute right-3 top-3 z-20 h-10 w-10" />
                    <span className="absolute bottom-4 left-4 z-10 select-none text-lg font-bold text-white drop-shadow">
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
        <div className="relative mt-[76px] h-[400px] w-full">
            {/* SVG 배경 */}
            <MockUpCard className="z-10 h-full w-full drop-shadow-lg" />
            <div className="absolute right-[54px] top-[10px] flex">
                <FolderOpen className="z-20 h-[25px] w-[25px]" />
                <p className="ml-2 select-none text-left text-base font-semibold">주말 요리 모음!</p>
            </div>

            {/* 2줄 롤링 */}
            <div className="absolute inset-0 z-20 flex flex-col justify-center space-y-5">
                <MarqueeRow bookmarks={bookmarksTop} duration={durationTop} style={{}} />
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
