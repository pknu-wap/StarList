import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../functions/hooks/useAuthStore";

const EXT_ID = import.meta.env.VITE_EXTENSION_ID;

const AuthSuccessPage = () => {
    const navigate = useNavigate();
    const { login } = useAuthStore(); // 로그인 상태 갱신 함수

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const access_token = params.get("token");
        const hasSynced = params.get("hasSynced") === "true";

        if (access_token) {
            // 익스텐션에 메시지 전달
            if (window.chrome?.runtime?.sendMessage) {
                window.chrome.runtime.sendMessage(EXT_ID, {
                    type: "SET_JWT",
                    token: access_token,
                    hasSynced,
                });
            }
            // 로컬 스토리지에 토큰 저장
            localStorage.setItem("accessToken", access_token);

            // 로그인 상태 저장
            login(access_token);

            // 주소창에서 token 제거 (보안을 위해서!)
            window.history.replaceState(null, "", import.meta.env.VITE_GOOGLE_AUTH_URI.replace(/.*\/\/[^/]+/, ""))

            // 메인 페이지로 이동
            navigate("/main", { replace: true });
        } else {
            // 토큰이 없는 경우 로그인 페이지로 회귀 
            navigate("/start", { replace: true });
        }
    }, [navigate, login]);

    return <div>로그인 처리 중...</div>;
};

export default AuthSuccessPage;