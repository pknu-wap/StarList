import { useQuery } from "@tanstack/react-query";

const fetchFolderTree = async () => {
    const res = await fetch("/folders/tree");
    if (!res.ok) throw new Error("서버 응답 실패");
    const data = await res.json();
    // data가 배열(최상위 노드 리스트)이거나, 객체 + children(트리) 둘 다 지원
    if (Array.isArray(data)) return data;
    if (Array.isArray(data.children)) return data.children;
    return [];
};

export default function useFolderTree() {
    return useQuery({
        queryKey: ["folderTree"],
        queryFn: fetchFolderTree,
        staleTime: 600_000,
        retry: 1,
    });
}
