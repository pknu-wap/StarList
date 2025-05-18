import React, { useEffect, useState } from "react";
import useBookmarkStore from "../functions/hooks/useBookmarkStore";
import { fetchBookmarks } from "../api/bookmarkApi";
import Header from "../components/header/Header";
import BookmarkCard from "../components/bookmark/BookmarkCard";

const MainPage = () => {
    const { bookmarks, setBookmarks } = useBookmarkStore(); // 북마크 관리
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


    const toggle = id => {
        setSelectedIds(prev =>
            prev.includes(id)
                ? prev.filter(x => x !== id)
                : [...prev, id]
        );
    };

    return (
        <div>
            <Header />
            <div className="max-w-screen-[1520px] mx-auto px-[150px] py-[150px]">
                {/* --- 카드 그리드 --- */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {bookmarks.map(bookmark => (
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

        </div>
    );
};

export default MainPage;
