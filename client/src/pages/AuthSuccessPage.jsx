import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

const EXT_ID = import.meta.env.VITE_EXTENSION_ID;

const AuthSuccessPage = () => {
    const navigate = useNavigate();
    const login = useAuthStore((state) => state.login); // 로그인 함수 가져오기

    useEffect(() => {
        const params = new URLSearchParams(window.location.search); // 현재 페이지의 URL에서 쿼리 문자열을 가져온 객체
        const token = params.get("token"); //URL 쿼리에서 토큰 값을 가져와 저장
        const hasSynced = params.get("hasSynced") === "true"; // 문자열 "true"를 boolean true로 바꿔 저장

        // 토큰이 존재하고 익스텐션 API인 chrome.runtime.sendMessage가 사용 가능한 경우에만 실행
        if (token && window.chrome?.runtime?.sendMessage) {
            // 익스텐션에게 메시지 전송
            window.chrome.runtime.sendMessage(EXT_ID, {
                type: "SET_JWT",
                token,
                hasSynced,
            });
        }
        login();
        navigate("/main"); // 익스텐션 메시지 전송 후 메인 페이지로 이동
    }, [navigate, login]);


    return <div>로그인 처리 중...</div>;
};

export default AuthSuccessPage;
