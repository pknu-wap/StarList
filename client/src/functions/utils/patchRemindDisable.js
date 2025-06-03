import useAuthStore from "../hooks/useAuthStore";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const patchRemindDisable = async (bookmarkId, remindDisabled) => {
    const { accessToken } = useAuthStore.getState();
    const res = await fetch(`${API_BASE_URL}/bookmarks/${bookmarkId}/remind-disable`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ remindDisabled }),
    });
    if (!res.ok) throw new Error("리마인드 상태 변경 실패");
    // 204 No Content 처리
    if (res.status === 204) return;
    return res.json();
};

export default patchRemindDisable;