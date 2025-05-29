import AddItemModal from "./AddItemModal";
import useFolderTree from "../../functions/hooks/useFolderTree";
import { useAddActions } from "../../functions/hooks/useAddActions";
import { PlusBookmark } from "../../assets";

const AddBookmarkModal = ({ onClose }) => {
    const { data: tree = [], isLoading } = useFolderTree();
    const { addBookmark } = useAddActions();

    const handleBookmarkSubmit = ({ title, url, location }) => {
        addBookmark.mutate(
            { title, url, folderId: location.id },
            { onSuccess: () => onClose() }
        );
    };

    return (
        <AddItemModal
            title="새 북마크 추가"
            icon={PlusBookmark}
            fields={[
                { name: "title", label: "이름", placeholder: "북마크 이름" },
                { name: "url", label: "URL", placeholder: "https://..." },
            ]}
            tree={tree}
            isLoading={isLoading}
            buttonText="추가하기"
            onSubmit={handleBookmarkSubmit}
            onClose={onClose}
        />
    );
};

export default AddBookmarkModal;
