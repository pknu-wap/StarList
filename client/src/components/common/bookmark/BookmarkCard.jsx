// 북마크 카드 컴포넌트
const BookmarkCard = ({ title, url }) => { // 시간 필요시 image,dataAdded prop 추가
    /*
    const formattedTime = new Date(dataAdded * 1000).toLocaleTimeString("ko-KR", {
        hour: "2-digit",
        minute: "2-digit",
    });
    
    */

    return (
        <div>
            <div className="w-[366px] h-60 rounded-[39px] bg-white border border-gray-300 shadow-card
                            p-4 flex flex-col justify-end">
                {/* 썸네일 
                    <img
                    src={image}
                />
                */}

                {/* 제목 */}
                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-[280px] h-[26px] text-xl font-semibold text-left text-main-black truncate" // turncate는 제목이 너무 길어지면 뒷부분을 ... 으로 처리
                >
                    {title}
                </a>

                {/* 시간 
                <span className="text-[22px] font-medium text-[#8d87a2] whitespace-nowrap">
                    {formattedTime}
                </span>
                */}

            </div>

        </div>
    );
}
export default BookmarkCard;