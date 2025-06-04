import useFolderHistoryStore from "../stores/useFolderHistoryStore";
import useSearchStore from "../stores/useSearchStore";
import useFolderTree from "./useFolderTree";
import findFolderPath from "../utils/findFolderPath";

function useMoveToFolder() {
    // 검색 여부에 따라 폴더 이동 로직을 다르게 처리
    const isSearching = useSearchStore((s) => s.isSearching);
    const finishSearch = useSearchStore((s) => s.finishSearch);

    // 검색 O : setHistory / 검색 X : push
    const push = useFolderHistoryStore((s) => s.push);
    const setHistory = useFolderHistoryStore((s) => s.setHistory);

    const { data: folderTree = {} } = useFolderTree();

    return (id, title) => {
        if (isSearching) {
            // 검색중이라면 해당 폴더의 경로를 히스토리로 지정
            const path = findFolderPath(folderTree, id);
            setHistory(path);
            finishSearch();
        } else {
            // 아니라면 단순히 현재 히스토리 스택에 추가
            push({ id, title });
        }
    };
}

export default useMoveToFolder;
