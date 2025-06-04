import React, { useState } from "react";

import DeleteButton from "../buttons/DeleteButton";
import MoveButton from "../buttons/MoveButton";
import SaveButton from "../buttons/SaveButton";
import defaultImage from "../../assets/default/default-image.svg";
import defaultFavicon from "../../assets/default/default-favicon.svg";

// 파비콘 url 추출 유틸
const getFaviconUrl = (url) => {
    try {
        const { hostname } = new URL(url);
        return `https://${hostname}/favicon.ico`;
    } catch {
        return defaultFavicon;
    }
};

const EditBookmarkModal = ({ info, onClose }) => {
    // 썸네일, 파비콘 상태
    const [imgSrc, setImgSrc] = useState(info.image && info.image.trim() ? info.image : defaultImage);
    const [faviconSrc, setFaviconSrc] = useState(getFaviconUrl(info.url));

    // 타이틀, url 상태
    const [title, setTitle] = useState(info.title || "");
    const [url, setUrl] = useState(info.url || "");

    // 데이터 변경이 일어나는 북마크 정보
    const targetBookmark = [{ id: info.id, type: "bookmark" }];

    // 현재 모달창에서 입력된 title, url 값
    const newContent = {
        newTitle: title,
        newURL: url,
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
            <div
                className="w-full max-w-[60ch] rounded-2xl bg-white text-lg shadow-lg"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex flex-col">
                    {/* image 영역 */}
                    <div className="relative flex aspect-[3/1] w-full items-center justify-center overflow-hidden rounded-t-2xl">
                        <img
                            src={imgSrc}
                            className="h-full w-full object-cover"
                            onError={() => setImgSrc(defaultImage)}
                        />
                    </div>
                    {/* info 영역 */}
                    <div className="flex flex-col gap-6 px-12 py-6">
                        <div className="flex items-center gap-4">
                            {/* 파비콘 */}
                            <div className="flex h-12 w-12 items-center justify-center rounded-full">
                                <img
                                    src={faviconSrc}
                                    className="h-10 w-10 rounded-full object-cover object-center"
                                    onError={() => setFaviconSrc(defaultFavicon)}
                                />
                            </div>
                            <input
                                className="flex-1 rounded-md border border-transparent px-2 py-1 text-xl font-bold outline-none focus:border-main-400 focus:ring-2"
                                value={title}
                                placeholder={info.title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <DeleteButton targets={targetBookmark} onClose={onClose} />
                        </div>
                        <input
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-500 placeholder-gray-400 outline-none focus:ring-2 focus:ring-main-400"
                            value={url}
                            placeholder={info.url || "www.example.com"}
                            onChange={(e) => setUrl(e.target.value)}
                        />
                        {/* 버튼 영역 */}
                        <MoveButton targets={targetBookmark} onClose={onClose} buttonText="이동" />
                        <SaveButton
                            newContent={newContent}
                            targets={targetBookmark}
                            onClose={onClose}
                            buttonText="저장"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditBookmarkModal;
