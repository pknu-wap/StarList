import React from "react";

/**
 * @param {object} node                             // 폴더 노드 (id, title, children ...)
 * @param {list[number]} currentlyOpenFolders       // 현재 확장한 폴더들 목록
 * @param {function} setCurrentlyOpenFolders        // 확장 버튼 클릭시 실행할 콜백 함수
 * @param {function} onSelect                       // 실제로 이동할 폴더 클릭시 실행할 콜백 함수
 * @param {number} depth                            // 현재까지 확장된 깊이
 **/

const TreeItem = ({ node, currentlyOpenFolders, setCurrentlyOpenFolders, onSelect, depth = 0 }) => {
    const hasChildren = node.children && node.children.length > 0;
    const isOpen = currentlyOpenFolders.includes(node.id);

    const LEFT_PADDING = 7;
    const LEFT_PADDING_PER_DEPTH = depth * LEFT_PADDING;

    // 자식이 있다면 확장 가능한 버튼을 추가, 아니라면 단순히 폴더의 title 만을 출력
    // 자식이 있으면서 확장을 했다면 아래에 TreeItem 을 추가하여 렌더링
    return (
        <div style={{ paddingLeft: `${LEFT_PADDING_PER_DEPTH}px` }}>
            <div className="flex items-center rounded-lg bg-main-50 px-2 py-1">
                {hasChildren ? (
                    <button
                        className="flex h-5 w-5 items-center justify-center rounded-lg transition-colors hover:bg-gray-100"
                        onClick={(e) => {
                            e.stopPropagation();
                            setCurrentlyOpenFolders((ids) =>
                                isOpen ? ids.filter((id) => id !== node.id) : [...ids, node.id],
                            );
                        }}
                    >
                        <span className="select-none text-xs">{isOpen ? "▶" : "▼"}</span>
                    </button>
                ) : (
                    <span className="w-5" />
                )}
                <span
                    className="flex-1 cursor-pointer rounded-lg px-2 py-1 text-left transition hover:bg-gray-100 group-hover:bg-main-100"
                    onClick={() => onSelect(node.id, node.title)}
                >
                    {node.title || "나의 북마크"}
                </span>
            </div>
            {hasChildren && isOpen && (
                <div>
                    {node.children.map((child) => (
                        <TreeItem
                            key={child.id}
                            node={child}
                            currentlyOpenFolders={currentlyOpenFolders}
                            setCurrentlyOpenFolders={setCurrentlyOpenFolders}
                            onSelect={onSelect}
                            depth={depth + 1}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

/**
 * @param {list[object]} folderTree                 // 트리 형태의 Object 리스트
 * @param {list[number]} currentlyOpenFolders       // 현재 확장한 폴더들 목록
 * @param {function} setCurrentlyOpenFolders        // 확장 버튼 클릭시 실행할 콜백 함수
 * @param {function} onSelect                       // 실제로 이동할 폴더 클릭시 실행할 콜백 함수
 **/

const DropDownFolderTree = ({ folderTree, currentlyOpenFolders, setCurrentlyOpenFolders, onSelect }) => {
    return (
        <div className="overflow-y-auto bg-main-50 shadow-xl">
            {folderTree.map((node) => (
                <TreeItem
                    key={node.id}
                    node={node}
                    currentlyOpenFolders={currentlyOpenFolders}
                    setCurrentlyOpenFolders={setCurrentlyOpenFolders}
                    onSelect={onSelect}
                />
            ))}
        </div>
    );
};

export default DropDownFolderTree;
