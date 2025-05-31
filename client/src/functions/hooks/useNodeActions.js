import { useMutation, useQueryClient } from "@tanstack/react-query";

import deleteBookmarksApi from "../utils/deleteBookmarks";
import deleteFoldersApi from "../utils/deleteFolders";

function useNodeActions() {
    const queryClient = useQueryClient();

    const deleteBookmarks = useMutation({
        mutationFn: (variables) => deleteBookmarksApi(variables.bookmarks),

        // Mutate 성공시
        onSuccess: (_, variables) => {
            console.log("deleteBookmarks 성공");

            // 현재 폴더 위치의 쿼리를 무효화하여 자동 refetch
            queryClient.invalidateQueries({
                queryKey: ["nodes", variables.currentPosition],
            });
        },

        // Mutate 실패시
        onError: () => {
            console.log("deleteBookmarks 실패");
        },
    });

    const deleteFolders = useMutation({
        mutationFn: (variables) => deleteFoldersApi(variables.folders),

        // Mutate 성공시
        onSuccess: () => {
            console.log("deleteFolders 성공");

            // 폴더의 경우에는 자식이 존재하므로 폴더 쿼리와 폴더 트리 쿼리를 전체 무효화
            queryClient.invalidateQueries({ queryKey: ["nodes"] });
            queryClient.invalidateQueries({ queryKey: ["folderTree"] });
        },

        // Mutate 실패시
        onError: () => {
            console.log("deleteFolders 실패");
        },
    });

    return { deleteBookmarks, deleteFolders };
}

export default useNodeActions;
