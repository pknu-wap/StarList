import { useState, useRef, useEffect } from "react";

// DropDown 컴포넌트: 폴더 트리 구조를 드롭다운 형태로 보여주고 선택할 수 있는 UI
const DropDown = ({ options, selected, setSelected }) => {
    // 드롭다운 열기/닫기 상태
    const [isOpen, setIsOpen] = useState(false);
    // 트리 노드 확장(펼침) 상태를 Set으로 관리
    const [expanded, setExpanded] = useState(new Set());
    // 드롭다운 외부 클릭 감지를 위한 ref
    const wrapperRef = useRef();

    // 컴포넌트 마운트 시 외부 클릭 이벤트 리스너 등록 및 언마운트 시 해제
    useEffect(() => {
        const handleOutside = (e) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleOutside);
        return () => document.removeEventListener("mousedown", handleOutside);
    }, []);

    // 특정 노드의 펼침/접힘 상태 토글
    const toggle = (id) => {
        setExpanded((prev) => {
            const s = new Set(prev);
            s.has(id) ? s.delete(id) : s.add(id);
            return s;
        });
    };

    // 노드 선택 시 호출: selected 상태 업데이트 후 드롭다운 닫기
    const handleSelect = (node) => {
        setSelected(node);
        setIsOpen(false);
    };

    // 트리 구조를 재귀적으로 렌더링하는 함수
    const renderTree = (nodes, level = 0) =>
        nodes.map((node) => {
            const hasChildren = Array.isArray(node.children) && node.children.length > 0;
            const isExpanded = expanded.has(node.id);
            const isSel = selected?.id === node.id;
            return (
                <div key={node.id}>
                    {/* 노드 항목 */}
                    <div
                        className={`flex items-center h-[45px]cursor-pointer hover:bg-gray-50 ${isSel ? "bg-gray-100" : ""}`}
                        style={{ paddingLeft: `${level * 1}rem` }} // 들여쓰기 레벨 적용
                        onClick={() => handleSelect(node)}
                    >
                        {/* 자식 노드가 있으면 펼침/접힘 버튼 표시 */}
                        {hasChildren && (
                            <span
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    toggle(node.id);
                                }}
                                className="mr-2"
                            >
                                {isExpanded ? "▼" : "▶"}
                            </span>
                        )}
                        {/* 노드 제목 */}
                        <span>{node.title}</span>
                    </div>
                    {/* 자식 노드가 펼쳐진 경우 재귀 렌더링 */}
                    {hasChildren && isExpanded && renderTree(node.children, level + 1)}
                </div>
            );
        });

    return (
        <div ref={wrapperRef} className="w-full max-w-[429px]">
            <div
                className={`
                    w-[300px] sm:w-[429px]
                    rounded-[12px] sm:rounded-[18px]
                    bg-main-50 overflow-y-auto
                    px-4 overflow-hidden
                    transition-[max-height] duration-300 ease-out
                    ${isOpen ? "max-h-[500px]" : "max-h-[61px]"}
                `}
            >
                {/** 현재 선택된 항목 버튼 */}
                <div
                    className="flex items-center justify-between px-4 h-[61px] cursor-pointer"
                    onClick={() => setIsOpen((v) => !v)}
                >
                    <span className="text-[22px] text-gray-500">
                        {selected?.title || "폴더 선택"}
                    </span>
                    <span>{isOpen ? "▲" : "▼"}</span>
                </div>

                {/** 펼쳐질 트리 리스트 */}
                <div>
                    {isOpen && renderTree(options)}
                </div>
            </div>
        </div>
    );
}

export default DropDown;
