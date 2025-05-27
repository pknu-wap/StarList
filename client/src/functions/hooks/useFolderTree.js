// src/hooks/useFolderTree.js
import { useQuery } from "@tanstack/react-query";

const fetchFolderTree = async () => {
    const res = await fetch("https://run.mocky.io/v3/cc9cd71c-4b80-4362-a7cf-2fa2ffa21d94");
    if (!res.ok) throw new Error("mock 서버 응답 실패");
    const root = await res.json();
    return Array.isArray(root.children) ? root.children : [];
};

export default function useFolderTree() {
    return useQuery({
        queryKey: ["folderTree"],
        queryFn: fetchFolderTree,
        staleTime: 600_000,
        retry: 1,
    });
}
