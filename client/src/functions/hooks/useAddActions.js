import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addBookmarkApi, addFolderApi } from "../utils/addBookmarkApi";

export function useAddActions() {
    const queryClient = useQueryClient();

    // 북마크 추가
    const addBookmark = useMutation({
        mutationFn: addBookmarkApi,
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries(["nodes", variables.folderId]);
        },
        onError: () => {
            alert("북마크 추가에 실패했습니다. 다시 시도해주세요.");
        },
    });

    // 폴더 추가
    const addFolder = useMutation({
        mutationFn: addFolderApi,
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries(["folderTree"]);
            if (variables.userId)
                queryClient.invalidateQueries(["nodes", variables.userId]);
        },
        onError: () => {
            alert("폴더 추가에 실패했습니다. 다시 시도해주세요.");
        },
    });

    return { addBookmark, addFolder };
}
