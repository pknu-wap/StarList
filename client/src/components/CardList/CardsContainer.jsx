import React, { useState } from "react";

import BookmarkCard from "./BookmarkCard";
import FolderCard from "./FolderCard";

const CardsContainer = ({ nodes, status, error }) => { 
    const [selectedIds, setSelectedIds] = useState([]);

    const toggle = id => {
        setSelectedIds(prev =>
            prev.includes(id)
                ? prev.filter(x => x !== id)
                : [...prev, id]
        );
    };

    if (status === "loading")
        return <p>로딩중...</p>;

    if (status === "error") {
        switch(error.code) {
            // 데이터가 없다면
            case 3001:
                return <p>아무 것도 없네요</p>;
            
            default:
                return <p>알 수 없는 오류: {error.message}</p>;
        }
    }

    // 정상적으로 데이터를 받아온다면
    return (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {nodes.map(node => (
                node.url === null
                    ? <FolderCard
                        key={node.id}
                        info={node}
                        selected={selectedIds.includes(node.id)}
                        onToggle={() => toggle(node.id)}
                        />
                    : <BookmarkCard
                        key={node.id} 
                        info={node}
                        selected={selectedIds.includes(node.id)}
                        onToggle={() => toggle(node.id)}
                        />
            ))}
        </div>
    );
}

export default CardsContainer;