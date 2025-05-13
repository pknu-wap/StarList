import { MainText, MainTitle } from "../assets";

const StartPage = () => {
    return (
        <div className="relative w-screen min-h-screen bg-[#57418b]">
            <div className="flex flex-col">
                <div className="w-full h-[116px] bg-[#FFF] grid place-items-center">
                    <img src={MainTitle} />
                </div>
                <img src={MainText} className="w-[1378px] h-[320px] mt-[48px]" />
            </div>

            <div className="fixed bottom-[170px] right-[140px] z-50">
                <GoogleLoginButton />
            </div>
        </div>
    );
};

export default StartPage;
