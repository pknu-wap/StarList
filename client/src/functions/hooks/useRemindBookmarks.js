import { useQuery } from "@tanstack/react-query";

const fetchRemindBookmarks = async () => {
    const res = await fetch('/bookmarks/reminders');
    if (!res.ok) throw new Error('데이터를 불러오지 못했습니다');
    return res.json();
};

const useRemindBookmarks = () => {
    return useQuery({
        queryKey: ['remindBookmarks'],
        queryFn: fetchRemindBookmarks,
        staleTime: 1000 * 60, // 1분 동안 캐싱
    });
}
export default useRemindBookmarks;