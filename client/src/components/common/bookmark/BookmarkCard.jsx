// 북마크 카드 컴포넌트
const BookmarkCard = ({ title, image, dataAdded, url }) => {
    const formattedTime = new Date(dataAdded * 1000).toLocaleTimeString("ko-KR", {
        hour: "2-digit",
        minute: "2-digit",
    });

    return (
        <div>
            <div className="w-[366px] h-60 rounded-[39px] bg-white border border-[#bcb6cd]">
                {/* 썸네일 */}
                <img
                    src={image}
                    className="w-[39px] h-[39px] rounded-full bg-[#BCB6CD]"
                />

                {/* 제목 */}
                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[22px] font-semibold no-underline hover:underline truncate flex-[2] ml-[18px]"
                    style={{ color: "#ffffff" }}
                >
                    {title}
                </a>

                {/* 시간 */}
                <span className="text-[22px] font-medium text-[#8d87a2] whitespace-nowrap">
                    {formattedTime}
                </span>
            </div>

        </div>
    );
}
export default BookmarkCard;