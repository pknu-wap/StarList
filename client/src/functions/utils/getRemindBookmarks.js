const getRemindBookmarks = async () => {
    const res = await fetch('/bookmarks/reminders');
    if (!res.ok) throw new Error('리마인드 데이터를 불러오지 못했습니다');
    return res.json();
};
export default getRemindBookmarks;