// 날짜별로 그룹핑하는 함수
export const groupBookmarksByDate = (bookmarks) => {
    const groups = {};

    bookmarks.forEach((bm) => {
        const date = new Date(bm.dateAdded * 1000);
        const dateStr = date.toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            weekday: "long"
        });

        if (!groups[dateStr]) {
            groups[dateStr] = [];
        }
        groups[dateStr].push(bm);
    });

    return groups;
};

export default groupBookmarksByDate;
