import { useQuery } from "@tanstack/react-query";
import getNodesBySearch from "../utils/getNodesBySearch";

// 이전에 검색 결과를 캐싱
// 이때, 데이터 변경 (추가,이동,삭제,변경) 이 일어나면 ["search"] 쿼리 자체를 invalidate 해야함!!
function useSearchNodes(keyword) {
    return useQuery({
        queryKey: ["search", keyword],
        queryFn: () => getNodesBySearch(keyword),

        // 키워드는 너무나도 다양하므로 메모리 낭비 방지를 위해 짧게 1분으로 설정 (ms)
        staleTime: 1000 * 60,
        // 3분으로 설정 (ms)
        gcTime: 1000 * 60 * 3,

        // 상황별 refetch 여부를 나타내는 옵션
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: true,
        retry: false,
    });
}

export default useSearchNodes;
