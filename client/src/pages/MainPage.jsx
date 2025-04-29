import React, { useEffect } from 'react';
import useBookmarkStore from '../store/useBookmarkStore';
import { fetchBookmarks } from '../api/bookmarkApi';
import BookmarkItem from '../components/common/BookmarkItem';
import Header from "../components/common/header";

const MainPage = () => {
    const { bookmarks, setBookmarks } = useBookmarkStore(); // Zustand에서 북마크 상태와 갱신 함수 가져오기

    // 컴포넌트가 처음 로드될 때 북마크 데이터를 요청하는 역할
    useEffect(() => {
        const load = async () => {
            try {
                const data = await fetchBookmarks(); // 서버로부터 데이터 받아오기
                setBookmarks(data); // 받아온 데이터를 Zustand에 저장
            } catch (err) {
                console.error('북마크 불러오기 실패:', err);
            }
        };
        load(); // 페이지를 열자마자 실행
    }, [setBookmarks]); // setBookmarks가 바뀔 때만 실행

    return (
        <div>
            <Header />
            <h1 className="text-2xl font-bold p-4">북마크 목록</h1>
            {/* 북마크 배열을 map으로 반복 출력하거나 없으면 안내 문구 표시 */}
            <div className="grid gap-4 p-4">
                {bookmarks.length > 0 ? (
                    bookmarks.map((bm) => (
                        <BookmarkItem key={bm.id} {...bm} />
                    ))
                ) : (
                    <p className="text-gray-500">북마크가 없습니다.</p>
                )}
            </div>
        </div>
    );
};

export default MainPage;
