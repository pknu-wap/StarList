import { useQuery } from "@tanstack/react-query";
import getRemindBookmarks from "../utils/getRemindBookmarks";

const useRemindBookmarks = () => {
    return useQuery({
        queryKey: ['remindBookmarks'],
        queryFn: getRemindBookmarks,
        staleTime: 1000 * 60, // 1분 동안 캐싱
        retry: 0, // 실패 시 재시도 X
    });
}
export default useRemindBookmarks;