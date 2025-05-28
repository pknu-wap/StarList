// src/components/common/EditModal.jsx
import React, { useState } from "react";
import { createPortal } from "react-dom";

export default function EditModal({
    mode, // "folder" | "bookmark"
    info, // folder: { id, title, … } | bookmark: { id, title, url, … }
    onClose, // () => void
    onSave, // (updatedInfo) => void
}) {
    const [title, setTitle] = useState(info.title);
    // bookmark일 때만 url 상태를 관리
    const [url, setUrl] = useState(info.url || "");

    // 저장 버튼 클릭 시
    const handleSubmit = () => {
        const updated =
            mode === "folder"
                ? // 폴더는 title만 업데이트
                  { ...info, title }
                : // 북마크는 title + url
                  { ...info, title, url };
        onSave(updated);
        onClose();
    };

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-[90vw] max-w-md rounded-lg bg-white p-6 shadow-lg">
                {/* 헤더 */}
                <h2 className="mb-4 text-xl font-semibold">{mode === "folder" ? "폴더 편집" : "북마크 편집"}</h2>

                {/* 공통: 제목 */}
                <label className="mb-4 block">
                    <span className="mb-1 block font-medium">제목</span>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full rounded border px-3 py-2"
                        placeholder="이름을 입력하세요"
                    />
                </label>

                {/* 북마크 모드일 때만 URL 필드 보여주기 */}
                {mode === "bookmark" && (
                    <label className="mb-4 block">
                        <span className="mb-1 block font-medium">URL</span>
                        <input
                            type="url"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            className="w-full rounded border px-3 py-2"
                            placeholder="https://example.com"
                        />
                    </label>
                )}

                {/* 버튼 그룹 */}
                <div className="mt-6 flex justify-end space-x-2">
                    <button onClick={onClose} className="rounded border px-4 py-2 hover:bg-gray-100">
                        취소
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="rounded bg-main-500 px-4 py-2 text-white hover:bg-main-600"
                    >
                        저장
                    </button>
                </div>
            </div>
        </div>,
        document.body,
    );
}
