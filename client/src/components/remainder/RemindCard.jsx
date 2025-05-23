const RemindCard = ({ title, url, image }) => {

    return (
        <div className={`relative w-full aspect-[3/2] 
                            rounded-[39px] 
                            p-4 flex flex-col justify-end 
                            border border-gray-300
                            overflow-hidden`}
        >
            {/* 썸네일 */}
            {image && (
                <div className="absolute inset-0 rounded-[39px] overflow-hidden z-0">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover"
                    />
                </div>
            )}

            {/* 이미지 위에 오버레이 */}
            <div className="absolute inset-0 rounded-[39px] bg-bookmark-overlay z-10 pointer-events-none" />

            <div className="relative z-20">
                {/* 제목 */}
                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full text-base sm:text-lg md:text-xl 
                            font-semibold text-left
                            text-white truncate"
                >
                    {title}
                </a>
            </div>
        </div>
    );
}
export default RemindCard;