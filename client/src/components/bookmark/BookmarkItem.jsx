// 북마크 각각의 정보를 저장하는 컴포넌트
const BookmarkItem = ({ title, image, dateAdded, url }) => {
    const formattedTime = new Date(dateAdded * 1000).toLocaleTimeString("ko-KR", {
        hour: "2-digit",
        minute: "2-digit",
    });


    return (
        <div className="w-full flex items-center justify-between px-6 py-2 my-[15px]">
            <div className="flex items-center gap-4 flex-grow">
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


                {/* 카테고리 */}
                <span className="text-[22px] font-medium text-[#8d87a2] flex-[1] truncate">
                    Category1 <span className="text-[#bcb6cd]">에 추가됨</span>
                </span>
            </div>

            {/* 시간 */}
            <span className="text-[22px] font-medium text-[#8d87a2] whitespace-nowrap">
                {formattedTime}
            </span>
        </div>

    );
};

export default BookmarkItem;
