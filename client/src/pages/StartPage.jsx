import { MainText, MainTitle } from "../assets";
import { useNavigate } from "react-router-dom";
import GoogleLoginButton from "../components/login/GoogleLoginButton";

const StartPage = () => {
    const navigate = useNavigate();
    // 정책 페이지 이동 핸들러(임시)
    const policyClick = () => {
        navigate('/policy');
    };
    return (
        <div className="relative w-screen min-h-screen bg-[#57418b]">
            <div className="flex flex-col">
                <div className="w-full h-[116px] bg-[#FFF] grid place-items-center">
                    <MainTitle className="w-[90px] h-[20px]" />
                </div>
                <MainText className="w-[1378px] h-[320px] mt-[48px]" />
            </div>

            <button onClick={policyClick}>개인정보처리방침</button>

            <div className="fixed bottom-[170px] right-[140px] z-50">
                <GoogleLoginButton />
            </div>
        </div>
    );
};

export default StartPage;
