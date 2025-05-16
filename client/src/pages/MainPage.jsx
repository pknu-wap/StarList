import React, { useEffect, useState } from "react";
import useBookmarkStore from "../store/useBookmarkStore";
import { fetchBookmarks } from "../api/bookmarkApi";
import Header from "../components/common/header/Header";
import BookmarkCard from "../components/common/bookmark/BookmarkCard";

const MainPage = () => {
    const { bookmarks, setBookmarks } = useBookmarkStore(); // 북마크 관리
    const [searchTerm, setSearchTerm] = useState(""); // 검색창
    const [selectedIds, setSelectedIds] = useState([]); // 사용자가 선택한 북마크의 ID목록 저장


    useEffect(() => {
        (async () => {
            try {
                const data = await fetchBookmarks();
                setBookmarks(data);
            } catch (e) {
                console.error(e);
            }
        })();
    }, [setBookmarks]);


    const filtered = bookmarks.filter(b =>
        b.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const toggle = id => {
        setSelectedIds(prev =>
            prev.includes(id)
                ? prev.filter(x => x !== id)
                : [...prev, id]
        );
    };

    return (
        <div className="px-6 py-8">
            <Header />

            {/* --- 나의 북마크 헤더 + 컨트롤 --- */}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-2xl font-semibold">나의 북마크</h2>
                <div className="flex items-center space-x-2">
                    <button className="px-4 py-2 bg-[#217fd7] text-white rounded-full hover:bg-blue-600 transition">
                        + New
                    </button>
                    <input
                        type="text"
                        placeholder="검색"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg"
                    />
                </div>
            </div>

            {/* --- 카드 그리드 --- */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filtered.map(bookmark => (
                    <BookmarkCard
                        key={bookmark.id}
                        title={bookmark.title}
                        url={bookmark.url}
                        selected={selectedIds.includes(bookmark.id)}
                        onToggle={() => toggle(bookmark.id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default MainPage;
