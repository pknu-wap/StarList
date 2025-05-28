import React, { useEffect, useRef, useCallback } from "react";
import useAuthStore from "../../functions/hooks/useAuthStore";
import useFolderHistoryStore from "../../functions/hooks/useFolderHistoryStore";
import useSelectedCardsStore from "../../functions/hooks/useSelectedCardsStore";
import useGetNodes from "../../functions/hooks/useGetNodes";

import BookmarkCard from "./BookmarkCard";
import FolderCard from "./FolderCard";

const CardsContainer = () => {
    const history = useFolderHistoryStore((s) => s.history);
    const folderId = history[history.length - 1].id;

    const logout = useAuthStore((s) => s.logout);

    const reset = useSelectedCardsStore((s) => s.reset);
    const containerRef = useRef(null);

    const { data = [], status, error } = useGetNodes(folderId);

    console.log(data); // 디버깅용
    console.log(error); // 디버깅용

    // 유효하지 않은 토큰을 사용하고 있다면 로그아웃
    useEffect(() => {
        if (status === "error" && error.code === "2002") logout();
    }, [status, error, logout]);

    // 현재 영역을 벗어난 곳을 클릭하면 선택된 카드들을 해제
    const handleClickOutside = useCallback(
        (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) reset();
        },
        [reset],
    );

    // 마운트될때 mousedown 이벤트 리스너를 등록, 언마운트시 해제
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [handleClickOutside]);

    // 로딩중
    if (status === "loading") {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="py-4 text-center">로딩중...</p>
            </div>
        );
    }

    // 에러 발생
    if (status === "error") {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-center text-2xl text-gray-300">에러 발생: {error.message}</p>
            </div>
        );
    }

    // 데이터가 없을때
    if (data.length === 0) {
        return (
            <div className="flex min-h-screen w-full items-center justify-center">
                <p className="text-center text-2xl text-gray-300">아무 것도 없네요</p>
            </div>
        );
    }

    // 데이터가 있을때
    return (
        <div ref={containerRef} className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {data.map((node) =>
                node.url === null ? (
                    <FolderCard key={node.index} info={node} />
                ) : (
                    <BookmarkCard key={node.index} info={node} />
                ),
            )}
        </div>
    );
};

export default CardsContainer;
