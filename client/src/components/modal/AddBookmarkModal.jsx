import { useQueryClient } from "@tanstack/react-query";
import AddItemModal from "./AddItemModal";
import useFolderTree from "../../functions/hooks/useFolderTree";
import { postBookmark } from "../../functions/utils/postBookmark";


// 북마크 아이콘 SVG 그대로 복붙 => 이후에 SVG 익스포트해서 쓰기
const BookmarkIcon = (
    <svg width={30} height={30} viewBox="0 0 30 30" fill="none" className="mr-2">
        <path
            d="M15 9.37497L15 14.9999M15 14.9999V20.6249M15 14.9999H20.625M15 14.9999H9.375M26.25 7.96873L26.25 22.0313C26.25 24.3612 24.3612 26.25 22.0312 26.25H7.96875C5.6388 26.25 3.75 24.3612 3.75 22.0313V7.96873C3.75 5.63879 5.6388 3.75 7.96875 3.75H22.0312C24.3612 3.75 26.25 5.63879 26.25 7.96873Z"
            stroke="black"
            strokeWidth="2.45823"
            strokeLinecap="round"
        />
    </svg>
);

const AddBookmarkModal = ({ onClose }) => {
    const queryClient = useQueryClient();
    const { data: tree = [], isLoading } = useFolderTree();
    console.log("[AddBookmarkModal] tree:", tree, "isLoading:", isLoading);

    const handleBookmarkSubmit = async ({ title, url, location }) => {
        console.log("[AddBookmarkModal] 북마크 추가 시도: title:", title, "url:", url, "location:", location);
        // postBookmark 호출
        await postBookmark({ title, url, parentId: location.id });
        queryClient.invalidateQueries({ queryKey: ["nodes"] }); // 모든 폴더의 북마크 목록 쿼리 무효화
    };
    console.log("tree", tree);
    return (
        <AddItemModal

            title="새 북마크 추가"
            icon={BookmarkIcon}
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
}

export default AddBookmarkModal;