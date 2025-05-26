import React, { useEffect } from "react";
import useAuthStore from "../../functions/hooks/useAuthStore";
import useFolderHistoryStore from "../../functions/hooks/useFolderHistoryStore";
import useGetNodes from "../../functions/hooks/useGetNodes";

import BookmarkCard from "./BookmarkCard";
import FolderCard from "./FolderCard";

const CardsContainer = () => {
    const folderId = useFolderHistoryStore(s => s.getCurrentPosition(s));
    const logout = useAuthStore(s => s.logout);

    const { data = [], status, error } = useGetNodes(folderId);

    console.log(data);  // 디버깅용

    useEffect(() => {
        if (status === "error" && error.code === "2002")
            logout();
    }, [status, error, logout]);


    if (status === "loading")
        return <p>로딩중...</p>;

    if (status === "error") {
        switch(error.code) {
            // 유효하지 않은 토큰이라면
            case "2002":
                return <p>세션이 만료되었습니다. 다시 로그인 해주세요</p>
            // 데이터가 없다면
            case "3001":
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
                        key={node.index}
                        info={node}
                        />
                    : <BookmarkCard
                        key={node.index} 
                        info={node}
                        />
            ))}
        </div>
    );
}

export default CardsContainer;