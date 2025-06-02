import React, { useState, useRef, useLayoutEffect, useCallback } from "react";
import useFolderHistoryStore from "../../functions/hooks/useFolderHistoryStore";
import useNodeActions from "../../functions/hooks/useNodeActions";
import useFolderTree from "../../functions/hooks/useFolderTree";
import splitByType from "../../functions/utils/splitByType";
import DropDownFolderTree from "./DropDownFolderTree";
import { MoveIcon } from "../../assets";

const MoveButton = ({ targets = [], onClose, buttonText = "", className = "" }) => {
    // 쿼리 무효화를 위해 현재 폴더 위치를 Mutate 메서드의 매개변수로 넘겨줌
    const history = useFolderHistoryStore((s) => s.history);
    const currentPosition = history[history.length - 1].id;

    // 드롭다운를 관리하기 위한 상태
    const [IsDropDownOpen, setIsDropDownOpen] = useState(false);
    const [currentlyOpenFolders, setCurrentlyOpenFolders] = useState([]);
    const [shouldFlipDropDown, setShouldFlipDropDown] = useState(false);

    // 폴더 트리가 화면 영역 밖으로 렌더링되는 것을 막기 위해 DOM 요소에 접근
    const moveButtonRef = useRef(null);
    const dropdownRef = useRef(null);

    // 폴더 트리 데이터와 로딩 상태 조회
    const { data: folderTree = [], status, error } = useFolderTree();

    // 이동에 대한 쿼리를 담당하는 객체
    const { moveNodesMutaion } = useNodeActions();

    // 드롭다운이 확장할때, 화면 밖으로 확장한다면 확장 방향을 뒤집기 위한 코드
    useLayoutEffect(() => {
        // 안열려있거나 reference 가 가리키는 DOM 요소가 없다면 스킵
        if (!IsDropDownOpen && (!moveButtonRef.current || !dropdownRef.current)) return;

        const checkDropdownPosition = () => {
            // 이동 버튼의 viewport 에 대한 상대적인 위치 정보를 알아냄
            const moveButtonRect = moveButtonRef.current.getBoundingClientRect();

            // 드롭다운의 높이를 계산
            const dropdownHeight = dropdownRef.current.offsetHeight;

            // 드롭다운이 최대로 확장할 수 있는 높이를 계산
            const spaceBelow = window.innerHeight - moveButtonRect.bottom;

            // 최대 높이 (여유 공간 포함) 를 넘어선다면 뒤집음
            const FREE_SPACE = 3;
            setShouldFlipDropDown(spaceBelow < dropdownHeight + FREE_SPACE);
        };

        checkDropdownPosition();
        // 마운트될 때, 이벤트 리스너를 등록
        window.addEventListener("resize", checkDropdownPosition);
        // 언마운트될 때, 해제
        return () => window.removeEventListener("resize", checkDropdownPosition);
    }, [IsDropDownOpen, currentlyOpenFolders]);

    // 이동을 처리하는 콜백 함수
    const handleMove = useCallback(
        async (folderId) => {
            console.log(folderId); // 디버깅용

            setIsDropDownOpen(false);
            const { folders, bookmarks } = splitByType(targets);
            const payload = {
                moveTo: folderId,
                bookmarks,
                folders,
            };
            await moveNodesMutaion.mutateAsync({ payload, currentPosition });
            if (onClose) onClose();
        },
        [moveNodesMutaion, currentPosition, onClose, targets],
    );

    // 로딩 상태
    if (status === "loading") {
        return (
            <button
                className="flex flex-1 cursor-wait items-center justify-center gap-x-2 rounded-lg bg-gray-100 py-2 opacity-60"
                disabled
            >
                <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-gray-400 border-t-transparent" />
                로딩중
            </button>
        );
    }

    // 에러 상태
    if (status === "error") {
        return (
            <button
                className="flex flex-1 cursor-not-allowed items-center justify-center gap-x-2 rounded-lg bg-gray-100 py-2 opacity-60"
                disabled
            >
                에러: {error}
            </button>
        );
    }

    // 정상 상태
    return (
        <div className="relative flex flex-1 justify-center rounded-lg bg-gray-50 py-2 hover:bg-gray-100">
            <button
                ref={moveButtonRef}
                className={`flex items-center gap-x-2 ${className}`}
                onClick={() => setIsDropDownOpen((IsDropDownOpen) => !IsDropDownOpen)}
            >
                <MoveIcon className="h-4.5 w-4.5" />
                {buttonText}
            </button>
            {IsDropDownOpen && (
                <div
                    ref={dropdownRef}
                    className={`absolute left-0 z-50 w-full overflow-y-auto rounded bg-white shadow-lg ${shouldFlipDropDown ? "bottom-full mb-2" : "top-full mt-2"} `}
                >
                    <DropDownFolderTree
                        folderTree={folderTree}
                        currentlyOpenFolders={currentlyOpenFolders}
                        setCurrentlyOpenFolders={setCurrentlyOpenFolders}
                        onSelect={handleMove}
                    />
                </div>
            )}
        </div>
    );
};

export default MoveButton;
