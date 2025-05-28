import React from "react";
import AddItemModal from "./AddItemModal";
import DropDown from "./DropDown";
import useFolderTree from "../../functions/hooks/useFolderTree";
// Folder 아이콘을 직접 SVG로 혹은 assets로 import해서 사용

const AddFolderModal = ({ onClose }) => {
    const { data: tree = [], isLoading } = useFolderTree();

    // 폴더 추가 API 호출 예시 (원하는 방식으로 바꿔도 됨)
    const handleSubmit = async ({ title, location }) => {
        // 실제 API 연동: postFolder({ title, parentId: location.id })
        console.log("폴더 추가:", { title, parentId: location.id });
        onClose();
    };

    return (
        <AddItemModal
            title="새 폴더 추가"
            icon={
                <svg width={30} height={30} viewBox="0 0 30 30" fill="none" className="mr-2">
                    <path
                        d="M15 13.75V21.25M11.25 17.5H18.75M27.5 23.75C27.5 24.413 27.2366 25.0489 26.7678 25.5178C26.2989 25.9866 25.663 26.25 25 26.25H5C4.33696 26.25 3.70107 25.9866 3.23223 25.5178C2.76339 25.0489 2.5 24.413 2.5 23.75V6.25C2.5 5.58696 2.76339 4.95107 3.23223 4.48223C3.70107 4.01339 4.33696 3.75 5 3.75H11.25L13.75 7.5H25C25.663 7.5 26.2989 7.76339 26.7678 8.23223C27.2366 8.70107 27.5 9.33696 27.5 10V23.75Z"
                        stroke="#1E1E1E"
                        strokeWidth="2.46"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            }
            fields={[
                { name: "title", label: "이름", placeholder: "폴더 이름" },
            ]}
            tree={tree}
            isLoading={isLoading}
            buttonText="추가하기"
            onSubmit={handleSubmit}
            onClose={onClose}
        />
    );
}

export default AddFolderModal;
