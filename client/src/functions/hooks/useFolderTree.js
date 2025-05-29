import useAuthStore from "../hooks/useAuthStore";
import { useQuery } from "@tanstack/react-query";

const fetchFolderTree = async () => {
    const token = useAuthStore.getState().accessToken?.trim();
    if (!token) {
        return []; // null 대신 항상 배열 반환
    }
    const res = await fetch("/folders/tree", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (!res.ok) throw new Error("서버 응답 실패: " + res.status);
    const data = await res.json();
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
