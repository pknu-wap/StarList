import React, { useState, useEffect } from "react";
import DropDown from "./DropDown";
import useFolderTree from "../../functions/hooks/useFolderTree";

const AddBookMark = ({ onClose }) => {
    const {
        data: tree = [],
        isLoading,
        isError,
        error,
    } = useFolderTree();

    const [name, setName] = useState("");
    const [url, setUrl] = useState("");
    const [location, setLocation] = useState(null);

    // 트리 로딩 후 첫 번째 폴더를 기본 선택
    useEffect(() => {
        if (!isLoading && tree.length > 0 && !location) {
            setLocation(tree[0]);
        }
    }, [tree, isLoading, location]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // { name, url, folderId: location.id } 형태로 전송
        console.log("북마크 추가:", {
            name,
            url,
            folderId: location.id,
        });
        onClose();
    };

    if (isLoading || !location) return <div className="p-4">로딩 중...</div>;
    if (isError)
        return (
            <div className="p-4 text-red-500">
                폴더를 불러오는 중 오류가 발생했습니다: {error.message}
            </div>
        );

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
                <div className="flex justify-between items-center border-b px-4 py-2">
                    <h2 className="text-xl font-semibold text-purple-700">
                        새 북마크 추가
                    </h2>
                    <button
                        className="text-gray-600 hover:text-gray-900"
                        onClick={onClose}
                    >
                        ✕
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="px-4 py-6 space-y-4">
                    <div>
                        <label className="block text-gray-700 mb-1">이름</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="북마크 이름"
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-purple-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1">URL</label>
                        <input
                            type="text"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="https://..."
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-purple-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1">위치</label>
                        <DropDown
                            options={tree}
                            selected={location}
                            setSelected={setLocation}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded"
                    >
                        추가하기
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddBookMark;