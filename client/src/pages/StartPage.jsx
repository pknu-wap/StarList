import { useNavigate } from "react-router-dom";
import LogoIcon from "../components/header/LogoIcon";
import GoogleLoginButton from "../components/startPageComponents/GoogleLoginButton";
import MoveExtensionStore from "../components/startPageComponents/MoveExtensionStore";
import FadeInSection from "../components/startPageComponents/FadeInSection";
import PersonalGithub from "../components/startPageComponents/PersonalGithub";
import MockUp from "../components/startPageComponents/MockUp";
import { StartBlur } from "../assets";


let StartPage;

StartPage = () => {
    const navigate = useNavigate();


    // 정책 페이지 이동 핸들러
    const policyClick = () => {
        navigate('/policy');
    };

    return (
        <div className="relative w-screen min-h-screen overflow-hidden">
            {/* 배경이 되는 컴포넌트 */}
            <StartBlur className="
                absolute top-[-1100px] left-[-700px]
                w-[4000px] h-[4000px] z-0 pointer-events-none
            " />

            <div className="flex flex-col items-center justify-center relative z-10">
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
                            text-black font-black leading-[1.1] font-sans tracking-[-0.03em]
                            text-3xl sm:text-6xl lg:text-8xl
                            w-full max-w-[70vw] sm:max-w-[750px] lg:max-w-[1092px]
                            [text-shadow:_4px_4px_15px_rgba(255,255,255,0.7)]
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
                            tracking-[-0.03em] font-sans
                        "
                        >
                            잊고 싶지 않은 모든 웹을, 하나로 모아보세요
                        </div>

                        {/* 익스텐션 스토어 페이지 */}
                        <MoveExtensionStore />

                        {/* 목업 컴포넌트*/}
                        <MockUp />
                    </div>
                </FadeInSection>
                <div className="
                            w-full px-4 sm:px-[50px] lg:px-[120px] pb-8 sm:pb-[80px]
                            flex flex-col lg:flex-row justify-between items-center
                            mt-[700px]
                        "
                >
                    <div className="flex flex-col sm:flex-row select-none">
                        <div className="flex flex-col sm:mr-12 lg:mr-20 mb-6 sm:mb-0">
                            <p className="mb-2 sm:mb-4 text-black text-xl sm:text-2xl lg:text-4xl font-semibold leading-7 sm:leading-10">Starlist</p>
                            <p className="text-sm sm:text-base">잊고 싶지 않은 모든 웹을, 하나로 모아보세요</p>
                        </div>
                        <div className="flex flex-col">
                            <p className="mb-2 sm:mb-4 text-black text-xl sm:text-2xl lg:text-4xl font-semibold">Contact us</p>
                            <div className="flex items-end">
                                <PersonalGithub name="김균호" link="https://github.com/g0rnn" />
                                <PersonalGithub name="김남언" link="https://github.com/skadjs" />
                                <PersonalGithub name="김민성" link="https://github.com/MNSK-00" />
                                <PersonalGithub name="이승훈" link="https://github.com/SH-MooDy" />
                                <PersonalGithub name="조수민" link="https://github.com/oohdhead" />
                            </div>
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
