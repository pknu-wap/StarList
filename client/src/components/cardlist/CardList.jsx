import React, { useState } from "react";
import { useGetNodes } from "../../functions/hooks/useGetNodes";
import Header from "../header/Header";
import BookmarkCard from "../bookmark/BookmarkCard";
import FolderCard from "./FolderCard";


const CardList = () => {
    const { data = [], status, error } = useGetNodes();
    const [selectedIds, setSelectedIds] = useState([]);

    const toggle = id => {
        setSelectedIds(prev =>
            prev.includes(id)
                ? prev.filter(x => x !== id)
                : [...prev, id]
        );
    };

    if (status === "error")
        return <p>에러 발생: {error.message}</p>

    return (
        <div className="max-w-screen-[1520px] mx-auto px-[150px] py-[150px]">
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {data.map(node => (
                    node.url === null
                        ? <FolderCard
                            key={node.id}
                            info={node}
                            />
                        : <BookmarkCard
                            key={node.id} 
                            info={node}
                            selected={selectedIds.includes(node.id)}
                            onToggle={() => toggle(node.id)}
                            />
                ))}
            </div>
        </div>
    )
}

export default CardList;