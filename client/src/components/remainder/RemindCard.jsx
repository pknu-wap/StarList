const RemindCard = ({ title, url, image }) => (
    <div
        onClick={() => window.location.href = url}
        className={`
      relative w-full h-full rounded-[39px] overflow-hidden 
      flex flex-col justify-end p-4 border border-gray-300
      cursor-pointer
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
            <p
                className="w-full text-lg font-bold text-left select-none text-white truncate"
            >
                {title}
            </p>
        </div>
    </div>
);

export default RemindCard;
