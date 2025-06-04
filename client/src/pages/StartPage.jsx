import { useNavigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import LogoIcon from "../components/header/LogoIcon";
import GoogleLoginButton from "../components/startsection/GoogleLoginButton";
import { StartBlur } from "../assets";
import FadeInSection from "../components/startsection/FadeInSection";

// lazy 로드된 컴포넌트
const MockUp = lazy(() => import("../components/startsection/MockUp"));
const MoveExtensionStore = lazy(() => import("../components/startsection/MoveExtensionStore"));
const PersonalGithub = lazy(() => import("../components/startsection/PersonalGithub"));

let StartPage;

StartPage = () => {
    const navigate = useNavigate();

    // 정책 페이지 이동 핸들러
    const policyClick = () => {
        navigate("/policy");
    };

    return (
        <div className="relative min-h-screen w-screen overflow-hidden">
            {/* 배경이 되는 컴포넌트 */}
            <StartBlur className="pointer-events-none absolute left-[-700px] top-[-1100px] z-0 h-[4000px] w-[4000px]" />

            <div className="relative z-10 flex flex-col items-center justify-center">
                {/* 로고, 로그인 버튼 */}
                <div className="flex w-full justify-between px-8 pt-4">
                    <LogoIcon />
                    <GoogleLoginButton />
                </div>

                <FadeInSection>
                    <div className="mx-auto flex w-full max-w-7xl flex-col items-center">
                        {/* 영어 문장 */}
                        <p className="mb-6 mt-20 w-full max-w-[70vw] select-none text-center font-sans text-3xl font-black leading-[1.1] tracking-[-0.03em] text-black [text-shadow:_4px_4px_15px_rgba(255,255,255,0.7)] sm:mb-[25px] sm:mt-[150px] sm:max-w-[750px] sm:text-6xl lg:max-w-[1092px] lg:text-8xl">
                            Where scattered links find their place.
                        </p>

                        {/* 한글 문장 */}
                        <div className="mb-8 w-full max-w-[90vw] select-none text-center font-sans text-base font-bold leading-10 tracking-[-0.03em] text-gray-600 sm:mb-[36px] sm:max-w-[650px] sm:text-xl lg:max-w-[953px] lg:text-3xl">
                            잊고 싶지 않은 모든 웹을, 하나로 모아보세요
                        </div>

                        {/* 익스텐션 스토어 버튼 */}
                        <Suspense fallback={<div>Loading...</div>}>
                            <MoveExtensionStore />
                        </Suspense>

                        {/* 목업창*/}
                        <Suspense fallback={<div>Loading...</div>}>
                            <MockUp />
                        </Suspense>
                    </div>
                </FadeInSection>

                <div className="mt-[700px] flex w-full flex-col items-center justify-between px-4 pb-8 sm:px-[50px] sm:pb-[80px] lg:flex-row lg:px-[120px]">
                    <div className="flex select-none flex-col sm:flex-row">
                        <div className="mb-6 flex flex-col sm:mb-0 sm:mr-12 lg:mr-20">
                            <p className="mb-2 text-xl font-semibold leading-7 text-black sm:mb-4 sm:text-2xl sm:leading-10 lg:text-4xl">
                                Starlist
                            </p>
                            <p className="text-sm sm:text-base">잊고 싶지 않은 모든 웹을, 하나로 모아보세요</p>
                        </div>
                        <div className="flex flex-col">
                            <p className="mb-2 text-xl font-semibold text-black sm:mb-4 sm:text-2xl lg:text-4xl">
                                Contact us
                            </p>
                            <div className="flex items-end">
                                {/* lazy 로드된 PersonalGithub */}
                                <Suspense fallback={<div>Loading...</div>}>
                                    <PersonalGithub name="김균호" link="https://github.com/g0rnn" />
                                    <PersonalGithub name="김남언" link="https://github.com/skadjs" />
                                    <PersonalGithub name="김민성" link="https://github.com/MNSK-00" />
                                    <PersonalGithub name="이승훈" link="https://github.com/SH-MooDy" />
                                    <PersonalGithub name="조수민" link="https://github.com/oohdhead" />
                                </Suspense>
                            </div>
                        </div>
                    </div>

                    <button className="mt-4 text-xs hover:text-gray-400 sm:mt-auto sm:text-base" onClick={policyClick}>
                        개인정보처리방침
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StartPage;
