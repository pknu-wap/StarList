import AddItemModal from "./AddItemModal";
import useFolderTree from "../../functions/hooks/useFolderTree";
import useNodeActions from "../../functions/hooks/useNodeActions";
import { PlusBookmark } from "../../assets";

// AddBookmarkModal 컴포넌트: 새 북마크 추가용 모달창
const AddBookmarkModal = ({ onClose }) => {
    // 폴더 트리 데이터와 로딩 상태 조회
    const { data: folderTree = {}, isLoading } = useFolderTree();
    // 북마크 추가 뮤테이션 함수
    const { addBookmarkMutation } = useNodeActions();

    // AddItemModal에 전달할 제출 핸들러
    const handleBookmarkSubmit = ({ title, url, location }) => {
        // mutate 호출 시 title, url, 선택된 폴더 ID(folderId)에 따라 추가
        addBookmarkMutation.mutate(
            { title, url, folderId: location.id },
            {
                onSuccess: () => onClose(), // 성공 시 모달 닫기
            },
        );
    };

    return (
        // AddItemModal 컴포넌트 재사용
        <AddItemModal
            title="새 북마크 추가" // 모달 제목
            icon={PlusBookmark} // 모달 아이콘
            fields={[
                // 입력 필드 설정
                { name: "title", label: "이름", placeholder: "북마크 이름" },
                { name: "url", label: "URL", placeholder: "https://..." },
            ]}
            tree={folderTree.children} // 폴더 트리 옵션
            isLoading={isLoading} // 로딩 상태
            buttonText="추가하기" // 버튼 텍스트
            onSubmit={handleBookmarkSubmit} // 제출 콜백
            onClose={onClose} // 모달 닫기 콜백
        />
    );
};

export default AddBookmarkModal;
