import AddItemModal from "./AddItemModal";
import useFolderTree from "../../functions/hooks/useFolderTree";
import { useAddActions } from "../../functions/hooks/useAddActions";
import { PlusFolder } from "../../assets";

// AddFolderModal 컴포넌트: 새 폴더 추가용 모달창
const AddFolderModal = ({ onClose }) => {
    // 폴더 트리 데이터와 로딩 상태 조회
    const { data: tree = [], isLoading } = useFolderTree();
    // 폴더 추가 뮤테이션 함수
    const { addFolder } = useAddActions();

    // AddItemModal에 전달할 제출 핸들러
    const handleFolderSubmit = ({ title, location }) => {
        // mutate 호출 시 title과 선택된 폴더 ID(userId)에 따라 추가
        addFolder.mutate(
            { title, userId: location.id },
            {
                onSuccess: () => onClose(), // 성공 시 모달 닫기
            }
        );
    };

    return (
        // AddItemModal 재사용
        <AddItemModal
            title="새 폴더 추가"        // 모달 제목
            icon={PlusFolder}           // 모달 아이콘
            fields={[
                { name: "title", label: "이름", placeholder: "폴더 이름" }
            ]}                            // 입력 필드 설정
            tree={tree}                  // 폴더 트리 옵션
            isLoading={isLoading}        // 로딩 상태
            buttonText="추가하기"        // 버튼 텍스트
            onSubmit={handleFolderSubmit} // 제출 콜백
            onClose={onClose}            // 모달 닫기 콜백
        />
    );
};

export default AddFolderModal;
