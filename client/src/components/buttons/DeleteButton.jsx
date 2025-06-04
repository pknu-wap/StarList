import React, { useCallback } from "react";
import useFolderHistoryStore from "../../functions/stores/useFolderHistoryStore";
import useNodeActions from "../../functions/hooks/useNodeActions";
import splitByType from "../../functions/utils/splitByType";
import { DeleteIcon } from "../../assets";

function DeleteButton({ targets = [], onClose, buttonText = "", className = "" }) {
    const history = useFolderHistoryStore((s) => s.history);
    const currentPosition = history[history.length - 1].id;

    const { deleteBookmarksMutation, deleteFoldersMutaion } = useNodeActions();

    // 삭제를 처리하는 콜백 함수
    const handleDelete = useCallback(async () => {
        const { folders, bookmarks } = splitByType(targets);

        // 디버깅용
        console.log(folders);
        console.log(bookmarks);

        // 두 작업은 비동기적으로 처리해도 무방
        const tasks = [];
        if (folders.length) tasks.push(deleteFoldersMutaion.mutateAsync({ folders }));
        if (bookmarks.length) tasks.push(deleteBookmarksMutation.mutateAsync({ bookmarks, currentPosition }));
        await Promise.all(tasks);

        if (onClose) onClose();
    }, [targets, onClose, currentPosition, deleteFoldersMutaion, deleteBookmarksMutation]);

    return (
        <button
            onClick={handleDelete}
            className={`flex items-center justify-center gap-x-2 rounded-lg border border-point-red bg-white px-2 py-2 hover:bg-point-red/20 ${className}`}
        >
            <DeleteIcon className="h-4.5 w-4.5" />
            {buttonText}
        </button>
    );
}

export default DeleteButton;
