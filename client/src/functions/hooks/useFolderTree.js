import useAuthStore from "../hooks/useAuthStore";
import { useQuery } from "@tanstack/react-query";

const fetchFolderTree = async () => {
    const token = useAuthStore.getState().accessToken?.trim();
    if (!token) {
        // 토큰이 없으면 API 호출 시도 자체를 하지 않음 (undefined 반환)
        return undefined;
    }
    const res = await fetch("/folders/tree", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (!res.ok) throw new Error("서버 응답 실패: " + res.status);
    const data = await res.json();
    // 실제로 필요한 데이터 구조가 배열이 아닐 때 children에서 추출
    return Array.isArray(data)
        ? data
        : Array.isArray(data.children)
            ? data.children
            : [];
};

const useFolderTree = () => {
    const token = useAuthStore(state => state.accessToken);
    return useQuery({
        queryKey: ["folderTree", token], // 토큰이 바뀔 때 refetch
        queryFn: fetchFolderTree,
        staleTime: 600_000,
        cacheTime: 600_000,
        retry: 1,
        enabled: !!token && token.length > 0,
        keepPreviousData: true, // 이전 데이터를 잠깐 유지
    });
};

export default useFolderTree;
