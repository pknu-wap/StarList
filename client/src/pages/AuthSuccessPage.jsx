import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../functions/hooks/useAuthStore";

const EXT_ID = import.meta.env.VITE_EXTENSION_ID;

const AuthSuccessPage = () => {
    const navigate = useNavigate();
    const { login } = useAuthStore(); // 로그인 상태 갱신 함수

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const accessToken = params.get("token");

        if (accessToken) {
            // 브라우저에 따라 runtime 을 다르게 선택
            const runtime = window.chrome?.runtime || window.browser?.runtime;
            if (runtime?.sendMessage) {
                // 익스텐션에 토큰을 실어 메시지 송신
                runtime.sendMessage(EXT_ID, {
                    type: "LOGIN_SUCCESS",
                    token: accessToken
                });
            }
            // 로그인 상태 저장
            login(accessToken);

            // 주소창에서 token 제거 (보안을 위해서!)
            window.history.replaceState(null, "", import.meta.env.VITE_GOOGLE_AUTH_URI.replace(/.*\/\/[^/]+/, ""))

            // 메인 페이지로 이동
            navigate("/main", { replace: true });
        } 
        else {
            // 토큰이 없는 경우 로그인 페이지로 회귀 
            navigate("/start", { replace: true });
        }
    }, [navigate, login]);

    return <div>로그인 처리 중...</div>;
};

export default AuthSuccessPage;