import { useNavigate } from "react-router-dom";
import LogoIcon from "../components/header/LogoIcon";
import GoogleLoginButton from "../components/startPageComponents/GoogleLoginButton";
import MoveExtensionStore from "../components/startPageComponents/MoveExtensionStore";
import FadeInSection from "../components/startPageComponents/FadeInSection";
import { MockUp } from "../assets";

let StartPage;

StartPage = () => {
    const navigate = useNavigate();


    // 정책 페이지 이동 핸들러(임시)
    const policyClick = () => {
        navigate('/policy');
    };

    return (
        <div
            className="relative w-screen min-h-screen"
            style={{
                backgroundImage: `
                                radial-gradient(circle 850px at 95% 42%, #87EDFF 0%, transparent 150%),
                                radial-gradient(circle 870px at 85% 42%, #7349D6 0%, transparent 170%),
                                radial-gradient(circle 870px at 94% 42%, #C8B8FF 0%, transparent 200%)
                            `
            }}
        >
            <div className="flex flex-col items-center justify-center">
                {/* 로고, 로그인 버튼 */}
                <div className="flex justify-between  w-full px-8 pt-4  ">
                    <LogoIcon />
                    <GoogleLoginButton />
                </div>

                <FadeInSection>
                    <div className="flex flex-col items-center w-full max-w-7xl mx-auto">
                        {/* 영어 문장 */}
                        <p className="
                            mb-6 sm:mb-[25px] mt-20 sm:mt-[150px]
                            text-center select-none
                            text-black font-black leading-[1.1]
                            text-3xl sm:text-6xl lg:text-8xl
                            w-full max-w-[70vw] sm:max-w-[750px] lg:max-w-[1092px]
                            font-sans
                        "
                        >
                            Where scattered links find their place.
                        </p>

                        {/* 한글 문장 */}
                        <div className="
                            mb-8 sm:mb-[36px] select-none
                            text-center text-gray-600 font-bold leading-10
                            text-base sm:text-xl lg:text-3xl
                            w-full max-w-[90vw] sm:max-w-[650px] lg:max-w-[953px]
                        "
                        >
                            잊고 싶지 않은 모든 웹을, 하나로 모아보세요
                        </div>

                        {/* 익스텐션 스토어 페이지 */}
                        <MoveExtensionStore />

                        {/* 임시 목업 이미지 */}
                        <div className="w-full flex justify-center">
                            <MockUp
                                className="
                                    w-full max-w-[95vw] sm:max-w-[800px] lg:max-w-[1400px]
                                    h-auto mb-40 sm:mb-[700px]
                                "
                            />
                        </div>
                    </div>
                </FadeInSection>

                <div className="
                            w-full px-4 sm:px-[50px] lg:px-[120px] pb-8 sm:pb-[100px]
                            flex flex-col lg:flex-row justify-between items-center
                            gap-10 lg:gap-0 max-w-7xl mx-auto
                        "
                >
                    <div className="flex flex-col sm:flex-row">
                        <div className="flex flex-col sm:mr-12 lg:mr-20 mb-6 sm:mb-0">
                            <p className="mb-2 sm:mb-4 text-black text-xl sm:text-2xl lg:text-4xl font-semibold leading-7 sm:leading-10">Starlist</p>
                            <p className="text-sm sm:text-base">잊고 싶지 않은 모든 웹을, 하나로 모아보세요</p>
                        </div>
                        <div className="flex flex-col">
                            <p className="mb-2 sm:mb-4 text-black text-xl sm:text-2xl lg:text-4xl font-semibold">Contributors</p>
                            <p className="tracking-wide text-xs sm:text-base">김균호 김남언 김민성 이승훈 조수민</p>
                        </div>
                    </div>

                    <button
                        className="mt-4 sm:mt-auto hover:text-gray-400 text-xs sm:text-base"
                        onClick={policyClick}
                    >
                        개인정보처리방침
                    </button>
                </div>

            </div>
        </div>
    );
};

export default StartPage;
