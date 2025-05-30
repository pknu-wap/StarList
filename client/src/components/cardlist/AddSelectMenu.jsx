// 북마크/폴더 추가 버튼 팝오버 메뉴
const AddSelectMenu = ({ onSelect, onClose }) => {
    // onSelect("bookmark") 또는 onSelect("folder")로 호출
    return (
        <div
            className="absolute left-1/2 -translate-x-1/2 mt-3 w-[167px] rounded-xl bg-white shadow-card py-3 z-50 flex flex-col items-center"
            style={{ minWidth: 120 }}
            onClick={e => e.stopPropagation()}
        >
            <button
                className="w-full py-2 text-center hover:bg-gray-100 rounded transition"
                onClick={() => { onSelect("bookmark"); onClose(); }}
            >
                새 북마크
            </button>
            <button
                className="w-full py-2 text-center hover:bg-gray-100 rounded transition"
                onClick={() => { onSelect("folder"); onClose(); }}
            >
                새 폴더
            </button>
        </div>
    );
}

export default AddSelectMenu;