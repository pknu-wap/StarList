import { useState, useRef, useEffect } from "react";

const DropDown = ({ options, selected, setSelected }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [expanded, setExpanded] = useState(new Set());
    const wrapperRef = useRef();

    useEffect(() => {
        const handleOutside = (e) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleOutside);
        return () => document.removeEventListener("mousedown", handleOutside);
    }, []);

    const toggle = (id) => {
        setExpanded((prev) => {
            const s = new Set(prev);
            s.has(id) ? s.delete(id) : s.add(id);
            return s;
        });
    };

    const handleSelect = (node) => {
        setSelected(node);
        setIsOpen(false);
    };

    const renderTree = (nodes, level = 0) =>
        nodes.map((node) => {
            console.log("renderTree nodes", nodes);
            const hasChildren = Array.isArray(node.children) && node.children.length > 0;
            const isExpanded = expanded.has(node.id);
            const isSel = selected?.id === node.id;
            console.log("DropDown options", options);
            return (
                <div key={node.id}>
                    <div
                        className={`flex items-center cursor-pointer hover:bg-gray-50 ${isSel ? "bg-gray-100" : ""}`}
                        style={{ paddingLeft: `${level * 1}rem` }}
                        onClick={() => handleSelect(node)}
                    >
                        {hasChildren && (
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    toggle(node.id);
                                }}
                                className="w-4 h-4 flex-shrink-0 mr-1"
                            >
                                {isExpanded ? "▼" : "▶"}
                            </button>
                        )}
                        <span className="flex-1 py-1">{node.title}</span>
                    </div>
                    {hasChildren && isExpanded && renderTree(node.children, level + 1)}
                </div>
            );
        });

    return (
        <div className="relative inline-block w-full" ref={wrapperRef}>
            <button
                type="button"
                className="w-full text-left border border-gray-300 rounded px-3 py-2 flex justify-between items-center"
                onClick={() => setIsOpen((v) => !v)}
            >
                {selected?.title || "폴더 선택"}
                <span className="ml-2">{isOpen ? "▲" : "▼"}</span>
            </button>
            {isOpen && (
                <div className="absolute mt-1 w-full max-h-60 overflow-auto bg-white border border-gray-300 rounded shadow-lg z-10">
                    {renderTree(options)}
                </div>
            )}
        </div>
    );
}

export default DropDown;
