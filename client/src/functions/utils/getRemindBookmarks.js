// import useAuthStore from "../hooks/useAuthStore";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/*
const getRemindBookmarks = async () => {
    const { accessToken } = useAuthStore.getState();

    const res = await fetch(`${API_BASE_URL}/bookmarks/reminders`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
        },
    });

    if (!res.ok) throw new Error('리마인드 데이터를 불러오지 못했습니다');
    return res.json();
};


*/
const getRemindBookmarks = async () => {


    const res = await fetch("public/reminder_test.json");
    if (!res.ok) throw new Error('리마인드 데이터를 불러오지 못했습니다');
    return res.json();
};
export default getRemindBookmarks;