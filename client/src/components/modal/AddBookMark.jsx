// src/components/AddBookMark.jsx
import React, { useState, useEffect } from "react";
import DropDown from "./DropDown";
import useGetNodes from "../../functions/hooks/useGetNodes";

const AddBookMark = ({ onClose }) => {
    // folderId=0 일 때 최상위 폴더(크롬의 “기타 북마크” 등)를 가져옴 :contentReference[oaicite:1]{index=1}
    const { data: folders = [], isLoading, isError } = useGetNodes(0);

    // 드롭다운 옵션: API에서 받은 최상위 폴더 리스트
    const folderOptions = folders;

    // 선택된 폴더 객체. 로딩 끝나면 첫 번째 폴더를 기본 선택
    const [location, setLocation] = useState(null);
    useEffect(() => {
        if (folders.length && location === null) {
            setLocation(folders[0]);
        }
    }, [folders, location]);

    const [name, setName] = useState("");
    const [url, setUrl] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // 실제 추가 요청 시 payload 예시: { name, url, folderId: location.id }
        console.log("북마크 추가:", { name, url, folderId: location.id });
        onClose();
    };

    if (isLoading || location === null) {
        return <div className="p-4">로딩 중...</div>;
    }
    if (isError) {
        return (
            <div className="p-4 text-red-500">
                폴더를 불러오는 중 오류가 발생했습니다.
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-96">
                <div className="flex justify-between items-center border-b px-4 py-2">
                    <h2 className="text-xl font-semibold text-purple-700">새 북마크 추가</h2>
                    <button
                        className="text-gray-600 hover:text-gray-900"
                        onClick={onClose}
                    >
                        ✕
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="px-4 py-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-1">이름</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="북마크 이름"
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-purple-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-1">URL</label>
                        <input
                            type="text"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="https://..."
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-purple-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-1">위치</label>
                        <DropDown
                            options={folderOptions}
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
};

export default AddBookMark;
