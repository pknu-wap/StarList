import { useQuery } from "@tanstack/react-query";
import getRemindBookmarks from "../utils/getRemindBookmarks";

const useRemindBookmarks = () => {
    return useQuery({
        queryKey: ['remindBookmarks'],
        queryFn: getRemindBookmarks,
        staleTime: 1000 * 60, // 1분 동안 캐싱
    });
}
export default useRemindBookmarks;