import AddItemModal from "./AddItemModal";
import useFolderTree from "../../functions/hooks/useFolderTree";
import { useAddActions } from "../../functions/hooks/useAddActions";
import { PlusFolder } from "../../assets";

const AddFolderModal = ({ onClose }) => {
    const { data: tree = [], isLoading } = useFolderTree();
    const { addFolder } = useAddActions();

    const handleFolderSubmit = ({ title, location }) => {
        addFolder.mutate(
            { title, userId: location.id },
            { onSuccess: () => onClose() }
        );
    };

    return (
        <AddItemModal
            title="새 폴더 추가"
            icon={PlusFolder}
            fields={[
                { name: "title", label: "폴더명", placeholder: "폴더 이름" }
            ]}
            tree={tree}
            isLoading={isLoading}
            buttonText="추가하기"
            onSubmit={handleFolderSubmit}
            onClose={onClose}
        />
    );
};
export default AddFolderModal;