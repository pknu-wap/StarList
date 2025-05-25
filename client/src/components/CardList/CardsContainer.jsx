import React from "react";
import { useAuth } from "../../context/AuthContext";
import useCurrentPositionStore from "../../functions/hooks/useCurrentPositionStore";
import useGetNodes from "../../functions/hooks/useGetNodes";

import BookmarkCard from "./BookmarkCard";
import FolderCard from "./FolderCard";

const CardsContainer = () => {
    const folderId = useCurrentPositionStore(state => state.currentPosition);
    const { data = [], status, error } = useGetNodes(folderId);
    console.log(data);  // 디버깅용
    const { logout } = useAuth();

    if (status === "loading")
        return <p>로딩중...</p>;

    if (status === "error") {
        switch(error.code) {
            // 유효하지 않은 토큰이라면
            case 2002:
                logout();
                return null;
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
            {data.map(node => (
                node.url === null
                    ? <FolderCard
                        key={node.id}
                        info={node}
                        />
                    : <BookmarkCard
                        key={node.id} 
                        info={node}
                        />
            ))}
        </div>
    );
}

export default CardsContainer;