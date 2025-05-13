import React, { useEffect } from "react";
import useBookmarkStore from "../store/useBookmarkStore";
import { fetchBookmarks } from "../api/bookmarkApi";
import { groupBookmarksByDate } from "../utils/groupBookmarksByDate";
import BookmarkGroupByDate from "../utils/groupBookmarksByDate";
import Header from "../components/common/header/Header";
import TestBookmarkButton from "../components/common/bookmark/TestBookmarkButton";

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
        <div>
            <Header />
            <TestBookmarkButton />
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
