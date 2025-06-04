// 북마크/폴더 추가 버튼 팝오버 메뉴
const AddSelectMenu = ({ onSelect, onClose }) => {
    // onSelect("bookmark") 또는 onSelect("folder")로 호출
    return (
        <div
            className={`absolute left-1/2 z-50 mt-2 flex w-[110px] -translate-x-1/2 flex-col items-center rounded-lg bg-white py-1 shadow-card sm:mt-3 sm:w-[130px] sm:rounded-lg sm:py-2 md:mt-4 md:w-[150px] md:rounded-xl md:py-2 lg:mt-3 lg:w-[167px] lg:rounded-xl lg:py-3`}
            onClick={(e) => e.stopPropagation()}
        >
            <button
                className={`w-full rounded py-1 text-center text-xs transition hover:bg-gray-100 sm:py-1.5 sm:text-sm md:py-2 md:text-base lg:py-2 lg:text-base`}
                onClick={() => {
                    onSelect("bookmark");
                    onClose();
                }}
            >
                새 북마크
            </button>
            <button
                className={`w-full rounded py-1 text-center text-xs transition hover:bg-gray-100 sm:py-1.5 sm:text-sm md:py-2 md:text-base lg:py-2 lg:text-base`}
                onClick={() => {
                    onSelect("folder");
                    onClose();
                }}
            >
                새 폴더
            </button>
        </div>
    );
};

export default AddSelectMenu;
