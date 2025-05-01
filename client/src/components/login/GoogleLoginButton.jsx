import googleLogo from "../../assets/google.svg";

const redirectUri = import.meta.env.VITE_GOOGLE_REDIRECT_URI;

const GoogleLoginButton = () => {
    const handleGoogleLogin = () => {
        // Google OAuth 로그인 페이지로 이동
        window.location.href = redirectUri;
    };

    return (
        <div
            className="flex items-center w-[249.53px] h-[74.86px] rounded-[31.39px] bg-[#e8e6f0] border-[4.02px] border-[#8d87a2] px-[20px] gap-[17px]
                 hover:scale-105 active:scale-95 transition-transform duration-150 cursor-pointer"
            onClick={handleGoogleLogin}
        >
            <img src={googleLogo} alt="Google 로고" className="w-[57.15px] h-[57.15px]" />
            <p className="text-[20px] font-Pretendard text-[#1a1a1a]">
                Google로 로그인
            </p>
        </div>
    );
};

export default GoogleLoginButton;
