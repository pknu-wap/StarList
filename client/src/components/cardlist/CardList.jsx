import React, { useState } from "react";
import { useGetNodes } from "../../functions/hooks/useGetNodes";
import useAuthStore from "../../functions/hooks/useAuthStore";
import ApiError from "../../functions/utils/ApiError";

import Header from "../header/Header";
import BookmarkCard from "../bookmark/BookmarkCard";
import FolderCard from "./FolderCard";


const CardList = () => {
    const { data = [], status, error } = useGetNodes();
    const [selectedIds, setSelectedIds] = useState([]);
    const logout = useAuthStore(state => state.logout);

    const toggle = id => {
        setSelectedIds(prev =>
            prev.includes(id)
                ? prev.filter(x => x !== id)
                : [...prev, id]
        );
    };

    if (status === "error" && error instanceof ApiError) {
        switch (error.code) {
            // 데이터가 없다면
            case 3001:
                return <p>"아무 것도 없네요</p>;

            // 유효하지 않은 토큰이라면
            case 2002:
                logout();
                return null;

            default:
                return <p>알 수 없는 오류: {error.message}</p>;
        }
    }

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