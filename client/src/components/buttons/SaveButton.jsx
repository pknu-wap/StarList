import React, { useCallback } from "react";
import useNodeActions from "../../functions/hooks/useNodeActions";
import useFolderHistoryStore from "../../functions/stores/useFolderHistoryStore";
import splitByType from "../../functions/utils/splitByType";

const SaveButton = ({ targets = [], newContent, onClose, buttonText = "", className = "" }) => {
    const history = useFolderHistoryStore((s) => s.history);
    const currentPosition = history[history.length - 1].id;

    const { editBookmarkMutation, editFolderMutation } = useNodeActions();

    // 수정 작업을 처리하는 콜백 함수
    const handleSave = useCallback(async () => {
        const { folders, bookmarks } = splitByType(targets);

        // 수정은 단일 대상만 지원하므로 구조 분해 할당 진행
        const [targetFolderId] = folders;
        const [targetBookmarkId] = bookmarks;

        // 수정된 컨텐츠에서 title, url 을 분해
        const { newTitle, newURL } = newContent;

        // request body 로 사용할 객체를 생성
        const payload = { title: newTitle, url: newURL };

        // 디버깅용
        console.log(payload);
        console.log(currentPosition);

        // 두 작업은 비동기적으로 처리해도 무방
        const tasks = [];
        if (targetFolderId && folders.length)
            tasks.push(
                editFolderMutation.mutateAsync({
                    folderId: targetFolderId,
                    payload: payload,
                    currentPosition: currentPosition,
                }),
            );
        if (targetBookmarkId && bookmarks.length)
            tasks.push(
                editBookmarkMutation.mutateAsync({
                    bookmarkId: targetBookmarkId,
                    payload: payload,
                    currentPosition: currentPosition,
                }),
            );
        await Promise.all(tasks);

        if (onClose) onClose();
    }, [targets, newContent, onClose, currentPosition, editFolderMutation, editBookmarkMutation]);

    return (
        <div className="flex justify-center">
            <button
                onClick={handleSave}
                className={`flex w-1/3 cursor-pointer items-center justify-center gap-x-2 rounded-lg bg-gradient-to-r from-main-500 to-main-black py-2 font-bold text-white shadow-[0px_2px_14px_0px_rgba(0,0,0,0.25)] transition-transform duration-150 hover:scale-105 ${className}`}
            >
                {buttonText}
            </button>
        </div>
    );
};

export default SaveButton;
