import React, { useState } from "react";
import { createPortal } from "react-dom";

export default function EditModal({ mode, info, onClose, onSave }) {
    const [title, setTitle] = useState(info.title);
    const [url, setUrl] = useState(info.url || "");

    const handleSubmit = () => {
        const updated = mode === "folder" ? { ...info, title } : { ...info, title, url };
        onSave(updated);
        onClose();
    };

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-[94vw] max-w-md rounded-lg bg-white p-6 shadow-lg sm:w-[80vw] md:w-[60vw] lg:w-[480px]">
                <h2 className="mb-4 text-xl font-semibold">{mode === "folder" ? "폴더 편집" : "북마크 편집"}</h2>
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
