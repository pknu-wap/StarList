import textImg from "../assets/main_text.svg";
import GoogleLoginButton from "../components/login/GoogleLoginButton";

const StartPage = () => {
    return (
        <div className="relative w-screen min-h-screen bg-[#57418b]">
            <div className="flex flex-col">
                <div className="w-full h-[116px] bg-[#FFF]"></div>
                <img src={textImg} className="w-[1378px] h-[320px] mt-[48px]" />
            </div>

            <div className="fixed bottom-[170px] right-[140px] z-50">
                <GoogleLoginButton />
            </div>
        </div>
    );
};

export default StartPage;
