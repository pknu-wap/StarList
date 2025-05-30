// 북마크/폴더 추가 버튼 팝오버 메뉴
const AddSelectMenu = ({ onSelect, onClose }) => {
    // onSelect("bookmark") 또는 onSelect("folder")로 호출
    return (
        <div
            className={`
                absolute left-1/2 -translate-x-1/2
                mt-2 sm:mt-3 md:mt-4 lg:mt-3
                w-[110px] sm:w-[130px] md:w-[150px] lg:w-[167px]
                rounded-lg sm:rounded-lg md:rounded-xl lg:rounded-xl
                bg-white shadow-card
                py-1 sm:py-2 md:py-2 lg:py-3
                z-50
                flex flex-col items-center
            `}
            onClick={e => e.stopPropagation()}
        >
            <button
                className={`
                    w-full
                    py-1 sm:py-1.5 md:py-2 lg:py-2
                    text-xs sm:text-sm md:text-base lg:text-base
                    text-center
                    hover:bg-gray-100
                    rounded
                    transition
                `}
                onClick={() => { onSelect("bookmark"); onClose(); }}
            >
                새 북마크
            </button>
            <button
                className={`
                    w-full
                    py-1 sm:py-1.5 md:py-2 lg:py-2
                    text-xs sm:text-sm md:text-base lg:text-base
                    text-center
                    hover:bg-gray-100
                    rounded
                    transition
                `}
                onClick={() => { onSelect("folder"); onClose(); }}
            >
                새 폴더
            </button>
        </div>
    );
}

export default AddSelectMenu;