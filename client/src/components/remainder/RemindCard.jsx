const RemindCard = ({ title, url, image }) => (
    <div
        className={`
      relative w-full h-full rounded-[39px] overflow-hidden 
      flex flex-col justify-end p-4 border border-gray-300
    `}

    >
        {/* 썸네일*/}
        {image && (
            <div className="absolute inset-0 z-0">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover rounded-[39px]"
                />
            </div>
        )}

        {/* 오버레이 */}
        <div
            className="absolute inset-0 rounded-[39px] bg-bookmark-overlay z-10 pointer-events-none"
        />

        {/* 텍스트 */}
        <div className="relative z-20">
            <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-lg font-bold text-left text-white truncate"
            >
                {title}
            </a>
        </div>
    </div>
);

export default RemindCard;
