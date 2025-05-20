import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getNodesByFolderId } from "../utils/getNodesByFolderId";
import { useCurrentPositionStore } from "./useCurrentPositionStore";
import { getRootNodes } from "../utils/getRootNodes";

// 백엔드로부터 가져온 리스트를 React Query 를 사용하여
// 캐싱, 변경 추적, 최신화를 가능하게 하는 함수
function useGetNodes() {
    // 현재 폴더 위치 상태를 구독
    const currentPosition = useCurrentPositionStore(state => state.currentPosition);

    return useQuery({
        queryKey: ["nodes", currentPosition ?? "root"],
        queryFn: () => {
            return currentPosition === null
                ? getRootNodes()
                : getNodesByFolderId(currentPosition);
        },

        // 캐시된 데이터가 언제까지 "fresh" 상태인지를 나타내는 옵션 (fresh 하지 않다면 refetch)
        // 10 분으로 설정 (ms)
        staleTime: 1000 * 60 * 10,

        // inactive 상태(= 해당 쿼리의 subscriber 가 0명) 일 때, 캐시에 남길 시간을 나타내는 옵션
        // 20 분으로 설정 (ms)
        gcTime: 1000 * 60 * 20,

        // 상황별 refetch 여부를 나타내는 옵션
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: true,

        // 쿼리 key 가 바뀔 때, 이전 쿼리의 데이터를 새 쿼리의 로딩 기간동안 그대로 유지하기 위한 옵션
        // 이 옵션을 사용하면 fetching 중에 화면이 깜빡이지 않음
        placeholderData: keepPreviousData
    });
}

export { useGetNodes };