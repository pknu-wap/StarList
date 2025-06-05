import { useQuery } from "@tanstack/react-query";
import fetchRemindBookmarks from "../apis/fetchRemindBookmarks";

const useRemindBookmarks = () => {
    return useQuery({
        queryKey: ["remindBookmarks"],
        queryFn: fetchRemindBookmarks,
        staleTime: 1000 * 60, // 1분 동안 캐싱
        retry: 0, // 실패 시 재시도 X
    });
};
export default useRemindBookmarks;
