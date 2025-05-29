import useAuthStore from "../hooks/useAuthStore";
import { useQuery } from "@tanstack/react-query";

const fetchFolderTree = async () => {
    const token = useAuthStore.getState().accessToken?.trim();
    console.log("[fetchFolderTree] token:", token);
    if (!token) {
        console.log("[fetchFolderTree] 토큰 없음, 빈 배열 반환");
        return [];
    }
    const res = await fetch("/folders/tree", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    console.log("[fetchFolderTree] fetch status:", res.status);
    if (!res.ok) {
        const errorBody = await res.text();
        console.log("[fetchFolderTree] fetch 실패, errorBody:", errorBody);
        return [];
    }
    const data = await res.json();
    console.log("[fetchFolderTree] data 응답:", data);
    const ret = Array.isArray(data)
        ? data
        : Array.isArray(data.children)
            ? data.children
            : [];
    console.log("[fetchFolderTree] 최종 반환:", ret);
    return ret;
};

const useFolderTree = () => {
    const token = useAuthStore(state => state.accessToken);
    console.log("[useFolderTree] accessToken 상태:", token);
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
