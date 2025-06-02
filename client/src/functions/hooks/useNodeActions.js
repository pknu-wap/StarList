import { useMutation, useQueryClient } from "@tanstack/react-query";

import { addBookmarkApi, addFolderApi } from "../utils/addBookmarkApi";
import deleteBookmarksApi from "../utils/deleteBookmarks";
import deleteFoldersApi from "../utils/deleteFolders";
import moveNodesApi from "../utils/moveNodes";
import editBookmarkApi from "../utils/editBookmark";
import editFolderApi from "../utils/editFolder";

function useNodeActions() {
    const queryClient = useQueryClient();

    // 북마크 추가
    const addBookmarkMutation = useMutation({
        mutationFn: addBookmarkApi,

        onSuccess: (data, variables) => {
            queryClient.invalidateQueries(["nodes", variables.folderId]);
        },

        onError: () => {
            alert("북마크 추가에 실패했습니다. 다시 시도해주세요.");
        },
    });

    // 폴더 추가
    const addFolderMutation = useMutation({
        mutationFn: addFolderApi,

        onSuccess: (data, variables) => {
            queryClient.invalidateQueries(["folderTree"]);
            if (variables.userId) queryClient.invalidateQueries(["nodes", variables.userId]);
        },

        onError: () => {
            alert("폴더 추가에 실패했습니다. 다시 시도해주세요.");
        },
    });

    // 북마크 리스트 삭제 (단일도 지원)
    const deleteBookmarksMutation = useMutation({
        mutationFn: (variables) => deleteBookmarksApi(variables.bookmarks),

        // Mutate 성공시
        onSuccess: (_, variables) => {
            console.log("deleteBookmarks 성공");

            // 현재 폴더 위치의 쿼리를 무효화
            queryClient.invalidateQueries({
                queryKey: ["nodes", variables.currentPosition],
            });
        },

        // Mutate 실패시
        onError: () => {
            console.log("deleteBookmarks 실패");
        },
    });

    // 폴더 리스트 삭제 (단일도 지원)
    const deleteFoldersMutaion = useMutation({
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

    // 북마크, 폴더 이동
    const moveNodesMutaion = useMutation({
        mutationFn: (variables) => moveNodesApi(variables.payload),

        // Mutate 성공시
        onSuccess: (_, variables) => {
            console.log("moveNodes 성공");

            // 이동할 폴더 위치 + 현재 폴더 위치 쿼리를 무효화하고 전체 폴더 트리 쿼리를 무효화
            queryClient.invalidateQueries({ queryKey: ["nodes", variables.payload.moveTo] });
            queryClient.invalidateQueries({ queryKey: ["nodes", variables.currentPosition] });
            queryClient.invalidateQueries({ queryKey: ["folderTree"] });
        },

        // Mutate 실패시
        onError: () => {
            console.log("moveNodes 실패");
        },
    });

    // 북마크 수정
    const editBookmarkMutation = useMutation({
        mutationFn: (variables) => editBookmarkApi(variables.bookmarkId, variables.payload),

        // Mutate 성공시
        onSuccess: (_, variables) => {
            console.log("editBookmark 성공");

            // 현재 폴더 위치 쿼리를 무효화
            queryClient.invalidateQueries({ queryKey: ["nodes", variables.currentPosition] });
        },

        // Mutate 실패시
        onError: () => {
            console.log("editBookmark 실패");
        },
    });

    // 폴더 수정
    const editFolderMutation = useMutation({
        mutationFn: (variables) => editFolderApi(variables.folderId, variables.payload),

        // Mutate 성공시
        onSuccess: (_, variables) => {
            console.log("editFolder 성공");

            // 폴더 트리 + 현재 폴더 위치 쿼리를 무효화
            queryClient.invalidateQueries({ queryKey: ["nodes", variables.currentPosition] });
            queryClient.invalidateQueries({ queryKey: ["folderTree"] });
        },

        // Mutate 실패시
        onError: () => {
            console.log("editFolder 실패");
        },
    });

    return {
        addBookmarkMutation,
        addFolderMutation,
        deleteBookmarksMutation,
        deleteFoldersMutaion,
        moveNodesMutaion,
        editBookmarkMutation,
        editFolderMutation,
    };
}

export default useNodeActions;
