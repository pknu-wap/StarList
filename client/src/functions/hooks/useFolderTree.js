import useAuthStore from "../hooks/useAuthStore";
import { useQuery } from "@tanstack/react-query";

const fetchFolderTree = async () => {
    const token = useAuthStore.getState().accessToken?.trim();
    const res = await fetch("/folders/tree", {
        headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
        },
    });
    if (!res.ok) throw new Error("서버 응답 실패: " + res.status);
    const data = await res.json();
    console.log("folders/tree 응답", data);
    return Array.isArray(data)
        ? data
        : Array.isArray(data.children)
            ? data.children
            : [];
};


const useFolderTree = () =>
    useQuery({
        queryKey: ["folderTree"],
        queryFn: fetchFolderTree,
        staleTime: 600_000,
        retry: 1,
    });

export default useFolderTree;
