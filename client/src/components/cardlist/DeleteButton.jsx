import useSelectedCardsStore from "../../functions/hooks/useSelectedCardsStore";
import useFolderHistoryStore from "../../functions/hooks/useFolderHistoryStore";
import useNodeActions from "../../functions/hooks/useNodeActions";

function DeleteButton() {
    const selectedCards = useSelectedCardsStore((s) => s.selectedCards);
    const reset = useSelectedCardsStore((s) => s.reset);

    const history = useFolderHistoryStore((s) => s.history);
    const currentPosition = history[history.length - 1].id;

    const { deleteBookmarks, deleteFolders } = useNodeActions();

    // 선택된 카드 리스트에서 북마크, 폴더 리스트로 분류
    const splitByType = (cards) => {
        const folders = [];
        const bookmarks = [];
        cards.forEach((card) => {
            if (card.type === "folder") folders.push(card.id);
            else if (card.type === "bookmark") bookmarks.push(card.id);
        });

        return { folders, bookmarks };
    };

    // 삭제를 처리하는 콜백 함수
    const handleDelete = async () => {
        const { folders, bookmarks } = splitByType(selectedCards);

        // 두 작업은 비동기적으로 처리해도 무방
        const tasks = [];

        if (folders.length) tasks.push(deleteFolders.mutateAsync({ folders }));
        if (bookmarks.length) tasks.push(deleteBookmarks.mutateAsync({ bookmarks, currentPosition }));
        await Promise.all(tasks);
        
        reset();
    };

    return (
        <button onClick={handleDelete} className="btn btn-danger">
            삭제
        </button>
    );
}

export default DeleteButton;
