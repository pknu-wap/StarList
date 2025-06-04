import React, { useEffect, useRef, useCallback } from "react";
import useAuthStore from "../../functions/stores/useAuthStore";
import useFolderHistoryStore from "../../functions/stores/useFolderHistoryStore";
import useSelectedCardsStore from "../../functions/stores/useSelectedCardsStore";
import useSearchStore from "../../functions/stores/useSearchStore";
import useGetNodes from "../../functions/hooks/useGetNodes";
import useSearchNodes from "../../functions/hooks/useSearchNodes";

import BookmarkCard from "./BookmarkCard";
import FolderCard from "./FolderCard";
import { SyncLoader } from "react-spinners";

const CardsContainer = () => {
    // 로그인 여부 전역 상태를 변경하는 로그아웃 함수를 사용
    const logout = useAuthStore((s) => s.logout);

    // 지금까지 이동한 폴더 경로를 나타내는 전역 상태를 사용, 가장 최근 폴더를 현재 위치로 설정
    const history = useFolderHistoryStore((s) => s.history);
    const currentPosition = history[history.length - 1].id;

    // CardsContainer 에서 벗어난 영역을 클릭시 카드 컴포넌트들을 일괄 해제하기 위해서
    // 최상위 DOM 요소를 접근해야하므로 이를 useRef 를 사용
    // containerRef 값이 바뀌더라도 불필요하게 CardsContainer 가 재렌더링되지 않음
    const reset = useSelectedCardsStore((s) => s.reset);
    const containerRef = useRef(null);

    // 현재 검색창을 사용하고 있는지와 어떤 값이 입력되었는지 알기 위한 전역 상태를 사용
    const isSearching = useSearchStore((s) => s.isSearching);
    const keyword = useSearchStore((s) => s.keyword);

    // isSearching 여부에 따라 사용할 함수와 결과를 분기 처리
    const [getNodesResult, searchNodesResult] = [
        useGetNodes(currentPosition, { enabled: !isSearching }),
        useSearchNodes(keyword, { enabled: isSearching }),
    ];
    const { data: nodes = [], status, error, refetch } = isSearching ? searchNodesResult : getNodesResult;

    console.log(nodes); // 디버깅용
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

    // SYNC_SUCCESS 메시지 감지 → refetch
    useEffect(() => {
        function handleSyncSuccess(event) {
            if (event.source !== window) return;
            if (event.data.type !== "SYNC_SUCCESS") return;
            refetch();
        }
        window.addEventListener("message", handleSyncSuccess);
        return () => window.removeEventListener("message", handleSyncSuccess);
    }, [refetch]);

    // 로딩중이거나나 Sync 오류일 경우
    if (status === "pending" && error?.code === "3001") {
        return (
            <div className="flex min-h-screen w-full items-center justify-center">
                <SyncLoader color="#7349D6" size={15} />
            </div>
        );
    }

    // 에러 발생
    if (status === "error") {
        console.error(error);
        return (
            <div className="flex min-h-screen items-center justify-center">
                <span className="text-center text-2xl text-gray-300">에러 발생! 잠시만 기다려주세요...</span>
            </div>
        );
    }

    // 데이터가 없을때
    if (nodes.length === 0) {
        return (
            <div className="flex min-h-screen w-full items-center justify-center">
                <p className="text-center text-2xl text-gray-300">여기에는 아무것도 없네요...</p>
            </div>
        );
    }

    // 정상적으로 데이터를 받아온다면
    return (
        <div ref={containerRef} className="mb-48 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {nodes.map((node) =>
                node.url === null ? (
                    <FolderCard key={`folder-${node.id}`} info={node} />
                ) : (
                    <BookmarkCard key={`bookmark-${node.id}`} info={node} />
                ),
            )}
        </div>
    );
};

export default CardsContainer;
