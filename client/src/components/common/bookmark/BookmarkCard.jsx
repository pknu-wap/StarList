import ToggleButton from "./ToggleButton";

/**
 * 북마크 카드 컴포넌트
 * @param {string} title 
 * @param {string} url
 * @param {boolean} selected   // 부모가 넘겨줄 선택 상태
 * @param {() => void} onToggle // 부모가 넘겨줄 토글 핸들러
 */



const BookmarkCard = ({ title, url, selected, onToggle }) => { // 시간 필요시 image,dataAdded prop 추가
    /*
    const formattedTime = new Date(dataAdded * 1000).toLocaleTimeString("ko-KR", {
        hour: "2-digit",
        minute: "2-digit",
    });
    
    */

    return (
        <div>
            <div className="relative w-[366px] h-[240px] rounded-[39px] bg-white border border-main-300 shadow-card 
                            hover:bg-gradient-to-b hover:from-gray-300 hover:to-white
                            p-4 flex flex-col justify-end
                            group"
            >
                {/* 썸네일 
                    <img
                    src={image}
                />
                */}
                {/* 토글 버튼 */}
                <div className="absolute top-[25px] left-[28px]
                                opacity-0 
                                group-hover:opacity-100
                                transition-opacity duration-200"
                >
                    <ToggleButton className="w-[34px] h-[34px]"
                        selected={selected}
                        onClick={onToggle} />
                </div>
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