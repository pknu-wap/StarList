import { useQuery, keepPreviousData } from "@tanstack/react-query";
import useAuthStore from "../stores/useAuthStore";
import ApiError from "../apis/ApiError";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

async function fetchFolderTree() {
    const { accessToken } = useAuthStore.getState();
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
    };

    const response = await fetch(`${API_BASE_URL}/folders/tree`, options);
    // 200 OK 가 아닐 경우
    if (!response.ok) {
        const errorBody = await response.json();
        console.log(errorBody);
        throw new ApiError(errorBody.code, errorBody.message, response);
    }
    return await response.json();
}

function useFolderTree() {
    return useQuery({
        queryKey: ["folderTree"],
        queryFn: () => fetchFolderTree(),

        staleTime: 1000 * 60 * 10,
        gcTime: 1000 * 60 * 20,

        // 상황별 refetch 여부를 나타내는 옵션
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: true,
        retry: false,

        placeholderData: keepPreviousData,
    });
}

export default useFolderTree;
