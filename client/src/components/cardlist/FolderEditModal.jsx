import React, { useState } from "react";

import DeleteButton from "./DeleteButton";
import MoveButton from "./MoveButton";
import SaveButton from "./SaveButton";

const FolderEditModal = ({ info, onClose }) => {
    // 타이틀 상태
    const [title, setTitle] = useState(info.title || "");

    // 데이터 변경이 일어나는 북마크 정보
    const targetFolder = [{ id: info.id, type: "folder" }];

    // 현재 모달창에서 입력된 title 값
    const newContent = {
        newTitle: title,
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
            <div
                className="w-full max-w-[60ch] rounded-2xl bg-white text-lg shadow-lg"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex flex-col">
                    {/* info 영역 */}
                    <div className="flex flex-col gap-6 px-12 py-6">
                        <div className="flex items-center gap-4">
                            <input
                                className="flex-1 rounded-md border border-transparent px-2 py-1 text-xl font-bold outline-none focus:border-main-400 focus:ring-2"
                                value={title}
                                placeholder={info.title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        {/* 버튼 영역 */}
                        <div className="flex gap-x-4">
                            <DeleteButton
                                buttonText="삭제"
                                targets={targetFolder}
                                onClose={onClose}
                                className="flex-1"
                            />
                            <MoveButton targets={targetFolder} onClose={onClose} buttonText="이동" />
                        </div>
                        <SaveButton
                            newContent={newContent}
                            targets={targetFolder}
                            onClose={onClose}
                            buttonText="저장"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FolderEditModal;
