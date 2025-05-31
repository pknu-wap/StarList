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
                <div className="flex justify-between w-full px-8 pt-4">
                    <LogoIcon />
                    <GoogleLoginButton />
                </div>

                <FadeInSection>
                    <div className="flex flex-col items-center">
                        {/* 영어 문장 */}
                        <p className="
                            w-[1092px] mb-[25px] mt-[150px]
                            text-center select-none
                            text-black text-8xl font-black leading-[90px]
                        "
                        >
                            Where scattered links find their place.
                        </p>

                        {/* 한글 문장 */}
                        <div className="
                            w-[953px] mb-[36px] select-none
                            text-center text-gray-600 text-3xl 
                            font-bold leading-10 
                        "
                        >
                            잊고 싶지 않은 모든 웹을, 하나로 모아보세요
                        </div>

                        {/* 익스텐션 스토어 페이지 */}
                        <MoveExtensionStore />

                        {/* 임시 목업 이미지 */}
                        <MockUp className="w-[1400px] h-[804px] mt-[30px] mb-[700px]" />
                    </div>
                </FadeInSection>

                <div className="
                            w-full px-[120px] pb-[100px]
                            flex justify-between
                            "
                >
                    <div className="flex flex-row">
                        <div className="flex flex-col mr-20">
                            <p className="mb-4 text-black text-4xl font-semibold leading-10">Starlist</p>
                            <p>잊고 싶지 않은 모든 웹을, 하나로 모아보세요</p>
                        </div>
                        <div className="flex flex-col">
                            <p className="mb-4 text-black text-4xl font-semibold">Contributors</p>
                            <p className="tracking-wide">김균호 김남언 김민성 이승훈 조수민</p>
                        </div>
                    </div>

                    <button
                        className="mt-auto hover:text-gray-400"
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
