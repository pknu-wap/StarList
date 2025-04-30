import React, { useEffect } from "react";
import useBookmarkStore from "../store/useBookmarkStore";
import { fetchBookmarks } from "../api/bookmarkApi";
import { groupBookmarksByDate } from "../utils/groupBookmarksByDate";
import BookmarkGroupByDate from "../components/bookmark/BookmarkGroupByDate"

const MainPage = () => {
    const { bookmarks, setBookmarks } = useBookmarkStore();

    useEffect(() => {
        const load = async () => {
            try {
                const data = await fetchBookmarks(); // 백엔드에서 북마크 받아오기
                setBookmarks(data);                  // Zustand에 저장
            } catch (error) {
                console.error("북마크 불러오기 실패:", error);
            }
        };

        load();
    }, [setBookmarks]);

    const grouped = groupBookmarksByDate(bookmarks || []); // 날짜별로 묶기

    return (
        <div className="px-8 py-10 space-y-10">
            <h1 className="text-3xl font-bold text-[#1a1a1a] w-fit mx-auto">
                최근 추가한 페이지
            </h1>

            {Object.entries(grouped).map(([date, list]) => (
                <BookmarkGroupByDate key={date} date={date} bookmarks={list} />
            ))}
        </div>

    );
};

export default MainPage;
