import 

const BookmarkCard = ({ title, url, image }) => {

    return (
        <div className={`relative w-full sm:max-w-[280px] md:max-w-[320px] lg:max-w-[366px] aspect-[3/2] 
                            rounded-[39px] bg-white shadow-card
                            p-4 flex flex-col justify-end group transition-colors duration-200
                            border border-gray-300
                            hover:bg-gradient-to-b hover:from-gray-200 hover:to-white
                            `}
        >
            {/* 썸네일 */}
            {image && (
                <div className="absolute inset-0 rounded-[39px] overflow-hidden">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover"
                    />
                </div>
            )}


            <div className="relative z-10">
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
export default BookmarkCard;